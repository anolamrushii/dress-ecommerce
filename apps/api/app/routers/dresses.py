import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.cloudinary_client import upload_dress_image
from app.database import get_db
from app.deps import get_current_admin, get_current_admin_optional
from app.models import AdminUser, Dress, DressImage
from app.schemas import DressCreate, DressImageOut, DressOut, DressUpdate

router = APIRouter(prefix="/dresses", tags=["dresses"])


@router.get("", response_model=list[DressOut])
def list_dresses(
    db: Session = Depends(get_db),
    current_admin: AdminUser | None = Depends(get_current_admin_optional),
) -> list[Dress]:
    """Public: only published dresses. Authenticated admins see every dress
    (used by the admin dashboard's dress table)."""
    query = db.query(Dress)
    if current_admin is None:
        query = query.filter(Dress.is_published.is_(True))
    return query.order_by(Dress.created_at.desc()).all()


@router.get("/{slug}", response_model=DressOut)
def get_dress(
    slug: str,
    db: Session = Depends(get_db),
    current_admin: AdminUser | None = Depends(get_current_admin_optional),
) -> Dress:
    query = db.query(Dress).filter(Dress.slug == slug)
    if current_admin is None:
        query = query.filter(Dress.is_published.is_(True))
    dress = query.first()
    if dress is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dress not found")
    return dress


@router.post("", response_model=DressOut, status_code=status.HTTP_201_CREATED)
def create_dress(
    payload: DressCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
) -> Dress:
    if db.query(Dress).filter(Dress.slug == payload.slug).first() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already in use")

    dress = Dress(**payload.model_dump())
    db.add(dress)
    db.commit()
    db.refresh(dress)
    return dress


@router.put("/{dress_id}", response_model=DressOut)
def update_dress(
    dress_id: uuid.UUID,
    payload: DressUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
) -> Dress:
    dress = db.get(Dress, dress_id)
    if dress is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dress not found")

    updates = payload.model_dump(exclude_unset=True)

    if "slug" in updates and updates["slug"] != dress.slug:
        existing = db.query(Dress).filter(Dress.slug == updates["slug"]).first()
        if existing is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already in use")

    for field, value in updates.items():
        setattr(dress, field, value)

    db.commit()
    db.refresh(dress)
    return dress


@router.delete("/{dress_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_dress(
    dress_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
) -> None:
    dress = db.get(Dress, dress_id)
    if dress is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dress not found")

    db.delete(dress)
    db.commit()


@router.post("/{dress_id}/images", response_model=DressImageOut, status_code=status.HTTP_201_CREATED)
async def upload_dress_image_route(
    dress_id: uuid.UUID,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
) -> DressImage:
    dress = db.get(Dress, dress_id)
    if dress is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dress not found")

    file_bytes = await file.read()
    image_url = upload_dress_image(file_bytes)

    next_sort_order = len(dress.images)
    image = DressImage(
        dress_id=dress.id,
        image_url=image_url,
        alt_text=dress.name,
        sort_order=next_sort_order,
    )
    db.add(image)
    db.commit()
    db.refresh(image)
    return image
