import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.cloudinary_client import CloudinaryNotConfiguredError, upload_dress_image
from app.database import get_db
from app.deps import get_current_admin, get_current_admin_optional
from app.models import AdminUser, Collection
from app.schemas import CollectionCreate, CollectionOut, CollectionUpdate

router = APIRouter(prefix="/collections", tags=["collections"])


@router.get("", response_model=list[CollectionOut])
def list_collections(
    db: Session = Depends(get_db),
    current_admin: AdminUser | None = Depends(get_current_admin_optional),
) -> list[Collection]:
    """Public: only published collections. Authenticated admins see every
    collection (used by the admin dashboard's collection table)."""
    query = db.query(Collection)
    if current_admin is None:
        query = query.filter(Collection.is_published.is_(True))
    return query.order_by(Collection.created_at.desc()).all()


@router.get("/{slug}", response_model=CollectionOut)
def get_collection(
    slug: str,
    db: Session = Depends(get_db),
    current_admin: AdminUser | None = Depends(get_current_admin_optional),
) -> Collection:
    query = db.query(Collection).filter(Collection.slug == slug)
    if current_admin is None:
        query = query.filter(Collection.is_published.is_(True))
    collection = query.first()
    if collection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Collection not found")
    return collection


@router.post("", response_model=CollectionOut, status_code=status.HTTP_201_CREATED)
def create_collection(
    payload: CollectionCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
) -> Collection:
    if db.query(Collection).filter(Collection.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already in use")

    collection = Collection(**payload.model_dump())
    db.add(collection)
    db.commit()
    db.refresh(collection)
    return collection


@router.put("/{collection_id}", response_model=CollectionOut)
def update_collection(
    collection_id: uuid.UUID,
    payload: CollectionUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
) -> Collection:
    collection = db.get(Collection, collection_id)
    if collection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Collection not found")

    updates = payload.model_dump(exclude_unset=True)

    if "slug" in updates and updates["slug"] != collection.slug:
        existing = db.query(Collection).filter(Collection.slug == updates["slug"]).first()
        if existing is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already in use")

    for field, value in updates.items():
        setattr(collection, field, value)

    db.commit()
    db.refresh(collection)
    return collection


@router.post("/{collection_id}/cover-image", response_model=CollectionOut)
async def upload_collection_cover_image(
    collection_id: uuid.UUID,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
) -> Collection:
    collection = db.get(Collection, collection_id)
    if collection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Collection not found")

    file_bytes = await file.read()
    try:
        image_url = upload_dress_image(file_bytes, folder="egzona-abazi/collections")
    except CloudinaryNotConfiguredError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Cloudinary upload failed: {exc}",
        ) from exc

    collection.cover_image_url = image_url
    db.commit()
    db.refresh(collection)
    return collection


@router.delete("/{collection_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_collection(
    collection_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
) -> None:
    collection = db.get(Collection, collection_id)
    if collection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Collection not found")

    db.delete(collection)
    db.commit()
