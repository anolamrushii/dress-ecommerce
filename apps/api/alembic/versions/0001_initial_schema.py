"""initial schema

Revision ID: 0001
Revises:
Create Date: 2026-07-20

Mirrors schema.sql exactly (tables, indexes, and the updated_at trigger).
"""
from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


UPGRADE_SQL = """
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE admin_users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(255),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login_at TIMESTAMPTZ
);

CREATE TABLE collections (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         VARCHAR(255) NOT NULL,
    slug         VARCHAR(255) UNIQUE NOT NULL,
    season       VARCHAR(100),
    description  TEXT,
    cover_image_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE dresses (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id  UUID REFERENCES collections(id) ON DELETE SET NULL,
    name           VARCHAR(255) NOT NULL,
    slug           VARCHAR(255) UNIQUE NOT NULL,
    description    TEXT,
    fabric         VARCHAR(255),
    sizes          TEXT[],
    price          NUMERIC(10, 2),
    is_featured    BOOLEAN NOT NULL DEFAULT false,
    is_published   BOOLEAN NOT NULL DEFAULT false,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dresses_collection_id ON dresses(collection_id);
CREATE INDEX idx_dresses_published ON dresses(is_published);

CREATE TABLE dress_images (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dress_id    UUID NOT NULL REFERENCES dresses(id) ON DELETE CASCADE,
    image_url   TEXT NOT NULL,
    alt_text    VARCHAR(255),
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dress_images_dress_id ON dress_images(dress_id);

CREATE TABLE inquiries (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dress_id      UUID REFERENCES dresses(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL,
    message       TEXT,
    is_read       BOOLEAN NOT NULL DEFAULT false,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inquiries_dress_id ON inquiries(dress_id);
CREATE INDEX idx_inquiries_is_read ON inquiries(is_read);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_collections_updated_at
    BEFORE UPDATE ON collections
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_dresses_updated_at
    BEFORE UPDATE ON dresses
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
"""

DOWNGRADE_SQL = """
DROP TRIGGER IF EXISTS trg_dresses_updated_at ON dresses;
DROP TRIGGER IF EXISTS trg_collections_updated_at ON collections;
DROP FUNCTION IF EXISTS set_updated_at();

DROP TABLE IF EXISTS inquiries;
DROP TABLE IF EXISTS dress_images;
DROP TABLE IF EXISTS dresses;
DROP TABLE IF EXISTS collections;
DROP TABLE IF EXISTS admin_users;
"""


def upgrade() -> None:
    op.execute(UPGRADE_SQL)


def downgrade() -> None:
    op.execute(DOWNGRADE_SQL)
