import Input from "../../../Component/Input";
import { Button, SelectInput } from "../../../Component";
import { DEFAULT_USER_ROLES } from "./userRoles";
import { Search } from "lucide-react";

const roleOptions = [
  { role_name: "all", label: "All roles" },
  ...DEFAULT_USER_ROLES.map((role) => ({ role_name: role })),
];

function UserFilters({
  search = "",
  role = "all",
  status = "all",
  roles = roleOptions,
  showStatus = false,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  className = "",
}) {
  const roleSelectOptions = roles.map((option) => {
    const value = typeof option === "string" ? option : option.role_name;
    const label =
      typeof option === "object" && option.label
        ? option.label
        : value.replace(/_/g, " ");

    return { value, label };
  });

  return (
    <section
      aria-label="Filter users"
      className={`bg-(--card) p-12 xl:p-20 rounded-md  grid grid-rows-3 xl:grid-cols-3 xl:grid-rows-1 gap-20 ${className}`}
    >
      <div className="flex">
        <Input
          name="Search users"
          id="users-search"
          value={search}
          onInputChange={(event) => onSearchChange?.(event.target.value)}
          labelClassName="!text-(--text-muted)"
          inputClassName="!bg-transparent !text-(--text)"
        />
        <Button className="" label="" Icon={Search} />
      </div>

      <SelectInput
        id="users-role-filter"
        label="Role"
        value={role}
        options={roleSelectOptions}
        className="bg-(--card)"
        onChange={onRoleChange}
      />

      <SelectInput
        id="users-status-filter"
        label="Status"
        value={status}
        options={[
          { value: "all", label: "All statuses" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        className="bg-(--card)"
        onChange={onStatusChange}
      />
    </section>
  );
}

export default UserFilters;
