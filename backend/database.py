
import sqlite3
from pathlib import Path


# Database location
DATABASE_PATH = (
    Path(__file__).parent
    / "logs"
    / "access_logs.db"
)


def create_database():

    # Create logs folder if it doesn't exist
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)

    # Connect to SQLite database
    connection = sqlite3.connect(DATABASE_PATH)

    cursor = connection.cursor()

    # Create access_logs table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS access_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            device TEXT,
            user_trust REAL,
            device_trust REAL,
            ip_reputation REAL,
            ml_risk REAL,
            trust_score REAL,
            decision TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    connection.close()




def save_access_log(
    username,
    device,
    user_trust,
    device_trust,
    ip_reputation,
    ml_risk,
    trust_score,
    decision
):

    connection = sqlite3.connect(DATABASE_PATH)

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO access_logs (
            username,
            device,
            user_trust,
            device_trust,
            ip_reputation,
            ml_risk,
            trust_score,
            decision
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        username,
        device,
        user_trust,
        device_trust,
        ip_reputation,
        ml_risk,
        trust_score,
        decision
    ))

    connection.commit()
    connection.close()

def get_access_logs():

    connection = sqlite3.connect(DATABASE_PATH)

    connection.row_factory = sqlite3.Row

    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM access_logs
        ORDER BY id DESC
    """)

    logs = cursor.fetchall()

    connection.close()

    return [dict(log) for log in logs]

def create_users_table():

    connection = sqlite3.connect(DATABASE_PATH)

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    connection.close()

# if __name__ == "__main__":
#     create_database()
#     create_users_table()
#     print("Database and users table created successfully.")



def create_user(username, password_hash, role="user"):

    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        # Check whether the role exists
        cursor.execute("""
            SELECT role_id FROM roles
            WHERE role_name = ?
        """, (role,))

        existing_role = cursor.fetchone()

        if existing_role is None:
            return False

        # Create the user
        cursor.execute("""
            INSERT INTO users (username, password_hash, role)
            VALUES (?, ?, ?)
        """, (username, password_hash, role))

        connection.commit()
        return True

    except sqlite3.IntegrityError:
        # Username already exists
        return False

    finally:
        connection.close()



def get_user_by_username(username):
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    try:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM users WHERE username = ?",
            (username,)
        )

        user = cursor.fetchone()
        return dict(user) if user else None

    finally:
        connection.close()


def create_rbac_tables():
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()
        cursor.execute("PRAGMA foreign_keys = ON")

        # 1. Roles table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS roles (
                role_id INTEGER PRIMARY KEY AUTOINCREMENT,
                role_name TEXT UNIQUE NOT NULL,
                description TEXT
            )
        """)

        # 2. Applications table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS applications (
                app_id INTEGER PRIMARY KEY AUTOINCREMENT,
                app_name TEXT UNIQUE NOT NULL,
                description TEXT
            )
        """)

        # 3. Role permissions table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS role_permissions (
                permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
                role_id INTEGER NOT NULL,
                app_id INTEGER NOT NULL,
                can_access INTEGER NOT NULL DEFAULT 0,

                FOREIGN KEY (role_id) REFERENCES roles(role_id),
                FOREIGN KEY (app_id) REFERENCES applications(app_id),

                UNIQUE(role_id, app_id),
                CHECK (can_access IN (0, 1))
            )
        """)

        connection.commit()
        print("RBAC tables created successfully!")

    finally:
        connection.close()


def seed_initial_roles():
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        roles = [
            ("admin", "Full system administration"),
            ("user", "Basic user access"),
            ("security_analyst", "Security monitoring and analysis"),
            ("developer", "Development application access"),
            ("employee", "Employee application access")
        ]

        cursor.executemany("""
            INSERT OR IGNORE INTO roles (role_name, description)
            VALUES (?, ?)
        """, roles)

        connection.commit()
        print("Initial roles added successfully!")

    finally:
        connection.close()



def seed_initial_applications():
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        applications = [
            ("Source Code Management", "Manage development code"),
            ("Database Management", "Access permitted databases"),
            ("Employee Management", "Manage employee information"),
            ("Security Analytics Dashboard", "Monitor threats and security events")
        ]

        cursor.executemany("""
            INSERT OR IGNORE INTO applications (app_name, description)
            VALUES (?, ?)
        """, applications)

        connection.commit()
        print("Initial applications added successfully!")

    finally:
        connection.close()


def seed_initial_permissions():
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        permissions = [
            ("admin", "Source Code Management", 1),
            ("admin", "Database Management", 1),
            ("admin", "Employee Management", 1),
            ("admin", "Security Analytics Dashboard", 1),

            ("security_analyst", "Security Analytics Dashboard", 1),

            ("developer", "Source Code Management", 1),

            ("employee", "Employee Management", 1)
        ]

        for role_name, app_name, can_access in permissions:

            cursor.execute(
                "SELECT role_id FROM roles WHERE role_name = ?",
                (role_name,)
            )
            role = cursor.fetchone()

            cursor.execute(
                "SELECT app_id FROM applications WHERE app_name = ?",
                (app_name,)
            )
            application = cursor.fetchone()

            if role and application:
                cursor.execute("""
                    INSERT OR IGNORE INTO role_permissions
                    (role_id, app_id, can_access)
                    VALUES (?, ?, ?)
                """, (role[0], application[0], can_access))

        connection.commit()
        print("Initial permissions added successfully!")

    finally:
        connection.close()


def check_application_permission(role_name, app_name):
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT role_permissions.can_access
            FROM role_permissions
            JOIN roles
                ON role_permissions.role_id = roles.role_id
            JOIN applications
                ON role_permissions.app_id = applications.app_id
            WHERE roles.role_name = ?
            AND applications.app_name = ?
        """, (role_name, app_name))

        result = cursor.fetchone()

        if result is None:
            return False

        return result[0] == 1

    finally:
        connection.close()




if __name__ == "__main__":
    create_database()
    create_users_table()
    create_rbac_tables()
    seed_initial_roles()
    seed_initial_applications()
    seed_initial_permissions()

    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            roles.role_name,
            applications.app_name,
            role_permissions.can_access
        FROM role_permissions
        JOIN roles
            ON role_permissions.role_id = roles.role_id
        JOIN applications
            ON role_permissions.app_id = applications.app_id
    """)

    permissions = cursor.fetchall()

    print("Stored permissions:")

    for permission in permissions:
        print(permission)

    connection.close()

    # Test permission checking
    print("\nPermission Testing:")

    print(
        "Developer -> Source Code:",
        check_application_permission(
            "developer",
            "Source Code Management"
        )
    )

    print(
        "Employee -> Source Code:",
        check_application_permission(
            "employee",
            "Source Code Management"
        )
    )

    print(
        "Security Analyst -> Security Dashboard:",
        check_application_permission(
            "security_analyst",
            "Security Analytics Dashboard"
        )
    )

def get_all_roles():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT role_id, role_name, description
            FROM roles
            ORDER BY role_id
        """)

        roles = cursor.fetchall()

        return [dict(role) for role in roles]

    finally:
        connection.close()


def get_all_users():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT id, username, role, created_at
            FROM users
            ORDER BY id
        """)

        users = cursor.fetchall()

        return [dict(user) for user in users]

    finally:
        connection.close()




def update_user_role(username, role_name):
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        # Check whether the requested role exists
        cursor.execute("""
            SELECT role_id FROM roles
            WHERE role_name = ?
        """, (role_name,))

        if cursor.fetchone() is None:
            return "role_not_found"

        # Check whether the user exists
        cursor.execute("""
            SELECT role FROM users
            WHERE username = ?
        """, (username,))

        user = cursor.fetchone()

        if user is None:
            return "user_not_found"

        current_role = user[0]

        # Prevent demoting the last admin
        if current_role == "admin" and role_name != "admin":
            cursor.execute("""
                SELECT COUNT(*) FROM users
                WHERE role = 'admin'
            """)

            admin_count = cursor.fetchone()[0]

            if admin_count <= 1:
                return "last_admin"

        # Update the role
        cursor.execute("""
            UPDATE users
            SET role = ?
            WHERE username = ?
        """, (role_name, username))

        connection.commit()
        return "success"

    finally:
        connection.close()



def create_role(role_name, description):
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO roles (role_name, description) VALUES (?, ?)",
            (role_name, description)
        )

        connection.commit()
        return True

    except sqlite3.IntegrityError:
        return False

    finally:
        connection.close()    



def grant_permission(role_name, app_name):
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT role_id FROM roles
            WHERE role_name = ?
        """, (role_name,))

        role = cursor.fetchone()

        cursor.execute("""
            SELECT app_id FROM applications
            WHERE app_name = ?
        """, (app_name,))

        app = cursor.fetchone()

        if role is None or app is None:
            return False

        cursor.execute("""
            INSERT INTO role_permissions
            (role_id, app_id, can_access)
            VALUES (?, ?, 1)
            ON CONFLICT(role_id, app_id)
            DO UPDATE SET can_access = 1
        """, (role[0], app[0]))

        connection.commit()
        return True

    finally:
        connection.close()    


def revoke_permission(role_name, app_name):
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT role_id FROM roles
            WHERE role_name = ?
        """, (role_name,))

        role = cursor.fetchone()

        cursor.execute("""
            SELECT app_id FROM applications
            WHERE app_name = ?
        """, (app_name,))

        app = cursor.fetchone()

        if role is None or app is None:
            return False

        cursor.execute("""
            UPDATE role_permissions
            SET can_access = 0
            WHERE role_id = ? AND app_id = ?
        """, (role[0], app[0]))

        connection.commit()

        return cursor.rowcount > 0

    finally:
        connection.close()


def get_all_applications():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT app_id, app_name, description
            FROM applications
            ORDER BY app_id
        """)

        applications = cursor.fetchall()

        return [dict(app) for app in applications]

    finally:
        connection.close()


def create_application(app_name, description):
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO applications (app_name, description)
            VALUES (?, ?)
            """,
            (app_name, description)
        )

        connection.commit()
        return True

    except sqlite3.IntegrityError:
        return False

    finally:
        connection.close()


def get_role_permissions(role_name):
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT
                r.role_name,
                a.app_name,
                rp.can_access
            FROM roles r
            LEFT JOIN role_permissions rp
                ON r.role_id = rp.role_id
            LEFT JOIN applications a
                ON rp.app_id = a.app_id
            WHERE r.role_name = ?
        """, (role_name,))

        permissions = cursor.fetchall()

        if not permissions:
            return None

        return [dict(permission) for permission in permissions]

    finally:
        connection.close()

def rename_user(old_username, new_username):

    connection = sqlite3.connect(DATABASE_PATH)

    try:
        cursor = connection.cursor()

        cursor.execute("""
            UPDATE users
            SET username = ?
            WHERE username = ?
        """, (new_username, old_username))

        connection.commit()

        return cursor.rowcount > 0

    except sqlite3.IntegrityError:
        return False

    finally:
        connection.close()
