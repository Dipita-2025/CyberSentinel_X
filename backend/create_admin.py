
from getpass import getpass

from database import (
    create_database,
    create_rbac_tables,
    seed_initial_roles,
    seed_initial_applications,
    seed_initial_permissions,
    create_user
)

from auth.security import hash_password


def main():
    # Initialize database and default RBAC data
    create_database()
    create_rbac_tables()
    seed_initial_roles()
    seed_initial_applications()
    seed_initial_permissions()

    print("\nCreate your initial admin account")

    username = input("Enter admin username: ").strip()
    password = getpass("Enter admin password: ")

    if not username or not password:
        print("Username and password cannot be empty.")
        return

    hashed_password = hash_password(password)

    success = create_user(
        username=username,
        password_hash=hashed_password,
        role="admin"
    )

    if success:
        print("\nAdmin account created successfully!")
    else:
        print("\nAccount could not be created.")
        print("Username may already exist or admin role is missing.")


if __name__ == "__main__":
    main()
