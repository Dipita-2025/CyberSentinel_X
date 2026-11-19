import { Pencil } from "lucide-react";
import { DataTable } from "../../../components/tables";
import { Button } from "../../../components/ui";
import UserStatus from "./UserStatus";

const UserTable = ({ users = [], loading = false, onEdit }) => {
  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "username",
      label: "Username",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (value) => <span className="capitalize">{value || "—"}</span>,
    },
    {
      key: "created_at",
      label: "Created At",
      sortable: true,
      render: (value) => (value ? new Date(value).toLocaleString() : "—"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, user) => (
        <Button
          size="sm"
          onClick={() => onEdit?.(user)}
          className="px-2 sm:px-3"
          display="flex justify-center items-center gap-1"
        >
          <Pencil size={14} strokeWidth={3} />
          <span className="hidden lg:inline">Edit</span>
        </Button>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      render: () => <UserStatus isActive={true} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      loading={loading}
      emptyMessage="No users found."
      rowKey="id"
    />
  );
};

export default UserTable;
