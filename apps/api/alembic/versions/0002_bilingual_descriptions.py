"""bilingual descriptions

Splits `description` into `description_en` (renamed from the existing
column, so current content is preserved as-is) and a new nullable
`description_sq` on both collections and dresses.

Revision ID: 0002
Revises: 0001
Create Date: 2026-07-21
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0002"
down_revision: Union[str, None] = "0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column("collections", "description", new_column_name="description_en")
    op.add_column("collections", sa.Column("description_sq", sa.Text))

    op.alter_column("dresses", "description", new_column_name="description_en")
    op.add_column("dresses", sa.Column("description_sq", sa.Text))


def downgrade() -> None:
    op.drop_column("dresses", "description_sq")
    op.alter_column("dresses", "description_en", new_column_name="description")

    op.drop_column("collections", "description_sq")
    op.alter_column("collections", "description_en", new_column_name="description")
