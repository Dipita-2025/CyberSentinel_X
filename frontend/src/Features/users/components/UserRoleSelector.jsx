import { DEFAULT_USER_ROLES, getRoleName } from "./userRoles";
import { SelectInput } from "../../../Component";

function UserRoleSelector({
  id = "user-role",
  label = "Role",
  value = "",
  roles = DEFAULT_USER_ROLES,
  onChange,
  disabled = false,
  includeCurrentRole = true,
}) {
  const availableRoles = roles.map((role) => ({
    value: getRoleName(role),
    label:
      typeof role === "object" && role?.label
        ? role.label
        : getRoleName(role).replace(/_/g, " "),
  }));
  const hasCurrentRole = availableRoles.some((role) => role.value === value);
  const selectRoles =
    includeCurrentRole && value && !hasCurrentRole
      ? [{ value, label: value.replace(/_/g, " ") }, ...availableRoles]
      : availableRoles;

  return (
    <SelectInput
      id={id}
      label={label}
      value={value}
      options={selectRoles}
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export default UserRoleSelector;
