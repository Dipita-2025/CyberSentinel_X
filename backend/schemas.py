from pydantic import BaseModel
from typing import List


class AccessRequest(BaseModel):
    device: str
    user_trust: float
    device_trust: float
    ip_reputation: float
    network_features: List[float]
    app_name: str


class LoginRequest(BaseModel):
    username: str
    password: str

from pydantic import BaseModel

class RoleCreate(BaseModel):
    role_name: str
    description: str 

class PermissionRequest(BaseModel):
    role_name: str
    app_name: str   


class ApplicationCreate(BaseModel):
    app_name: str
    description: str

class UserRoleUpdate(BaseModel):
    role_name: str

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "employee"


