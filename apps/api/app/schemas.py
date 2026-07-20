import uuid
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, EmailStr


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------------------------------------------------------------------------
# Collections
# ---------------------------------------------------------------------------
class CollectionBase(BaseModel):
    name: str
    slug: str
    season: str | None = None
    description: str | None = None
    cover_image_url: str | None = None
    is_published: bool = False


class CollectionCreate(CollectionBase):
    pass


class CollectionUpdate(BaseModel):
    name: str | None = None
    slug: str | None = None
    season: str | None = None
    description: str | None = None
    cover_image_url: str | None = None
    is_published: bool | None = None


class CollectionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    slug: str
    season: str | None = None
    description: str | None = None
    cover_image_url: str | None = None
    is_published: bool
    created_at: datetime
    updated_at: datetime


# ---------------------------------------------------------------------------
# Dress images
# ---------------------------------------------------------------------------
class DressImageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    image_url: str
    alt_text: str | None = None
    sort_order: int


# ---------------------------------------------------------------------------
# Dresses
# ---------------------------------------------------------------------------
class DressBase(BaseModel):
    collection_id: uuid.UUID | None = None
    name: str
    slug: str
    description: str | None = None
    fabric: str | None = None
    sizes: list[str] | None = None
    price: Decimal | None = None
    is_featured: bool = False
    is_published: bool = False


class DressCreate(DressBase):
    pass


class DressUpdate(BaseModel):
    collection_id: uuid.UUID | None = None
    name: str | None = None
    slug: str | None = None
    description: str | None = None
    fabric: str | None = None
    sizes: list[str] | None = None
    price: Decimal | None = None
    is_featured: bool | None = None
    is_published: bool | None = None


class DressOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    collection_id: uuid.UUID | None = None
    name: str
    slug: str
    description: str | None = None
    fabric: str | None = None
    sizes: list[str] | None = None
    price: Decimal | None = None
    is_featured: bool
    is_published: bool
    created_at: datetime
    updated_at: datetime
    images: list[DressImageOut] = []
    collection: CollectionOut | None = None


# ---------------------------------------------------------------------------
# Inquiries
# ---------------------------------------------------------------------------
class InquiryCreate(BaseModel):
    dress_id: uuid.UUID | None = None
    customer_name: str
    email: EmailStr
    message: str | None = None


class InquiryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    dress_id: uuid.UUID | None = None
    customer_name: str
    email: EmailStr
    message: str | None = None
    is_read: bool
    created_at: datetime
