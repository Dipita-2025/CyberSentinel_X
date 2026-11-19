import { Input, Select, Button } from "../../../components/ui";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "security_analyst", label: "Security Analyst" },
  { value: "developer", label: "Developer" },
  { value: "employee", label: "Employee" },
];

const UserFilters = ({
  search,
  onSearchChange,
  role,
  onRoleChange,
  onClear,
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">
        <Input
          name="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users..."
        />
      </div>

      <div className="w-full sm:w-52">
        <Select
          name="role"
          value={role}
          onChange={onRoleChange}
          placeholder="All Roles"
          options={roleOptions}
        />
      </div>

      <Button onClick={onClear} disabled={!search && role === "all"}>
        Clear
      </Button>
    </div>
  );
};

export default UserFilters;
