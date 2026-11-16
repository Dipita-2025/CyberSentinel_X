
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from auth.security import hash_password
from schemas import (
    AccessRequest,
    LoginRequest,
    RoleCreate,
    PermissionRequest,
    ApplicationCreate,
    UserRoleUpdate,
    UserCreate
)

from database import (
    create_database,
    create_rbac_tables,
    seed_initial_roles,
    seed_initial_applications,
    seed_initial_permissions,
    save_access_log,
    get_access_logs,
    get_user_by_username,
    check_application_permission,
    get_all_roles,
    create_role,
    grant_permission,
    revoke_permission,
    get_all_applications,
    create_application,
    get_role_permissions,
    get_all_users,
    update_user_role,
    create_user,
    rename_user
)

from auth.security import verify_password, create_access_token, decode_access_token

from trust_engine import calculate_trust_score
from decision_engine import make_decision
from ml_model import predict_risk, feature_columns



# TEST_DATA_PATH = (
#     Path(__file__).parent.parent
#     / "data"
#     / "processed"
#     / "X_test.csv"
# )


app = FastAPI()
security = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security)
):
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Authentication token is missing"
        )

    token = credentials.credentials

    payload = decode_access_token(token)

    if payload is None or not payload.get("sub"):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user = get_user_by_username(payload["sub"])

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return {
        "sub": user["username"],
        "role": user["role"]
    }

def require_admin(
    current_user: dict = Depends(get_current_user)
):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables
create_database()
create_rbac_tables()
seed_initial_roles()
seed_initial_applications()
seed_initial_permissions()

@app.post("/login")
def login(request: LoginRequest):

    # Step 1: Find the user in the database
    user = get_user_by_username(request.username)

    # Step 2: Check whether the user exists
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    # Step 3: Verify the entered password
    password_valid = verify_password(
        request.password,
        user["password_hash"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    # Step 4: Generate JWT token
    access_token = create_access_token(
        username=user["username"],
        role=user["role"]
    )

    # Step 5: Return token to the user
    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "username": user["username"],
        "role": user["role"]
    }

@app.get("/roles")
def get_roles(current_user: dict = Depends(require_admin)):
    roles = get_all_roles()

    return {
        "total_roles": len(roles),
        "roles": roles
    }


@app.get("/users")
def get_users(current_user: dict = Depends(require_admin)):
    users = get_all_users()

    return {
        "total_users": len(users),
        "users": users
    }


@app.post("/users")
def admin_create_user(
    user: UserCreate,
    current_user: dict = Depends(require_admin)
):
    # Hash the initial password
    hashed_password = hash_password(user.password)

    # Save the new user in the database
    success = create_user(
        user.username,
        hashed_password,
        user.role
    )

    if not success:
        raise HTTPException(
            status_code=400,
            detail="Username already exists or role does not exist"
        )

    return {
        "message": "User created successfully",
        "username": user.username,
        "role": user.role
    }


@app.get("/applications")
def get_applications(current_user: dict = Depends(require_admin)):
    applications = get_all_applications()

    return {
        "total_applications": len(applications),
        "applications": applications
    }


@app.post("/applications")
def add_application(
    request: ApplicationCreate,
    current_user: dict = Depends(require_admin)
):
    result = create_application(
        request.app_name,
        request.description
    )

    if not result:
        raise HTTPException(
            status_code=409,
            detail="Application already exists"
        )

    return {
        "message": "Application created successfully",
        "app_name": request.app_name
    }

@app.get("/")
def home():
    return {
        "message": "Secure Access Control API is running"
    }


@app.get("/test")
def test():
    return {
        "message": "Test endpoint is working"
    }

@app.get("/logs")
def logs(current_user: dict = Depends(require_admin)):
    access_logs = get_access_logs()

    return {
        "username": current_user["sub"],
        "total_logs": len(access_logs),
        "logs": access_logs
    }

@app.post("/hello")
def hello():
    return {
        "message": "Hello from POST"
    }




@app.post("/access")
def access(
    request: AccessRequest,
    current_user: dict = Depends(get_current_user)
):
    if not check_application_permission(
        current_user["role"],
        request.app_name
    ):
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access this application"
        )

    # Get the 70 network features from the request
    features = request.network_features

    # Check that exactly 70 features were provided
    if len(features) != len(feature_columns):
        return {
            "error": f"Expected {len(feature_columns)} network features, "
                     f"but received {len(features)}."
        }

    # Get real ML prediction from XGBoost
    ml_result = predict_risk(features)

    # Get ML risk
    ml_risk = ml_result["ml_risk"]

    # Calculate trust score
    trust_result = calculate_trust_score(
        user_trust=request.user_trust,
        device_trust=request.device_trust,
        ip_reputation=request.ip_reputation,
        ml_risk=ml_risk
    )

    # Get trust score
    trust_score = trust_result["trust_score"]

    # Make final decision
    decision = make_decision(trust_score)

    # Save access request using authenticated username
    save_access_log(
        username=current_user["sub"],
        device=request.device,
        user_trust=request.user_trust,
        device_trust=request.device_trust,
        ip_reputation=request.ip_reputation,
        ml_risk=ml_risk,
        trust_score=trust_score,
        decision=decision
    )

    # Return complete result
    return {
        "username": current_user["sub"],
        **ml_result,
        **trust_result,
        "decision": decision
    }

@app.post("/roles")
def add_role(
    request: RoleCreate,
    current_user: dict = Depends(require_admin)
):
    result = create_role(
        request.role_name,
        request.description
    )

    if not result:
        raise HTTPException(
            status_code=409,
            detail="Role already exists"
        )

    return {
        "message": "Role created successfully",
        "role_name": request.role_name
    }

@app.post("/permissions")
def add_permission(
    request: PermissionRequest,
    current_user: dict = Depends(require_admin)
):
    result = grant_permission(
        request.role_name,
        request.app_name
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Role or application not found"
        )

    return {
        "message": "Permission granted successfully",
        "role_name": request.role_name,
        "app_name": request.app_name
    }


@app.delete("/permissions")
def remove_permission(
    request: PermissionRequest,
    current_user: dict = Depends(require_admin)
):
    result = revoke_permission(
        request.role_name,
        request.app_name
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Permission not found or already revoked"
        )

    return {
        "message": "Permission revoked successfully",
        "role_name": request.role_name,
        "app_name": request.app_name
    }



@app.get("/roles/{role_name}/permissions")
def view_role_permissions(
    role_name: str,
    current_user: dict = Depends(require_admin)
):
    permissions = get_role_permissions(role_name)

    if permissions is None:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return {
        "role_name": role_name,
        "permissions": permissions
    }




@app.put("/users/{username}/role")
def change_user_role(
    username: str,
    request: UserRoleUpdate,
    current_user: dict = Depends(require_admin)
):
    # Prevent an admin from demoting their own account
    if (
        username == current_user["sub"]
        and request.role_name != "admin"
    ):
        raise HTTPException(
            status_code=403,
            detail="You cannot demote your own admin account"
        )

    result = update_user_role(username, request.role_name)

    if result == "user_not_found":
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if result == "role_not_found":
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    if result == "last_admin":
        raise HTTPException(
            status_code=403,
            detail="Cannot demote the last admin"
        )

    return {
        "message": f"Role of {username} updated successfully",
        "new_role": request.role_name
    }


@app.put("/users/{old_username}/rename")
def admin_rename_user(
    old_username: str,
    new_username: str,
    current_user: dict = Depends(require_admin)
):
    success = rename_user(old_username, new_username)

    if not success:
        raise HTTPException(
            status_code=400,
            detail="Old username not found or new username already exists"
        )

    return {
        "message": "Username updated successfully",
        "old_username": old_username,
        "new_username": new_username
    }





