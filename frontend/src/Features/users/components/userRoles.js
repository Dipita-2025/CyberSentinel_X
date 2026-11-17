export const DEFAULT_USER_ROLES = [
  "admin",
  "user",
  "security_analyst",
  "developer",
  "employee",
];

export function getRoleName(role) {
  return typeof role === "string" ? role : role?.role_name ?? role?.name ?? "";
}

export function formatRoleName(role) {
  const roleName = getRoleName(role);
  const displayNames = {
    admin: "Administrator",
    security_analyst: "Analyst",
  };

  return displayNames[roleName] ?? roleName.replace(/_/g, " ");
}
