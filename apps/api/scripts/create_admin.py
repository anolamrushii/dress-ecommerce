"""One-off CLI to create an admin_users row.

There is no public signup endpoint by design -- the admin dashboard is only
for the site owner. Run this once (locally or via `render exec`) to create
the first login:

    python -m scripts.create_admin
"""
import getpass
import sys

sys.path.append(".")

from app.database import SessionLocal  # noqa: E402
from app.models import AdminUser  # noqa: E402
from app.security import hash_password  # noqa: E402


def main() -> None:
    email = input("Admin email: ").strip().lower()
    full_name = input("Full name (optional): ").strip() or None
    password = getpass.getpass("Password: ")
    confirm = getpass.getpass("Confirm password: ")

    if password != confirm:
        print("Passwords do not match.")
        raise SystemExit(1)

    db = SessionLocal()
    try:
        if db.query(AdminUser).filter(AdminUser.email == email).first() is not None:
            print(f"An admin with email {email} already exists.")
            raise SystemExit(1)

        admin = AdminUser(email=email, password_hash=hash_password(password), full_name=full_name)
        db.add(admin)
        db.commit()
        print(f"Created admin user: {email}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
