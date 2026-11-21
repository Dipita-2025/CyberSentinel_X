import { useCallback, useEffect, useMemo, useState } from "react";

import { Modal, Button } from "../../components/ui";
import {
  UserTable,
  UserFilters,
  UserForm,
  EditUserForm,
  UserStats,
} from "../../features/users/components";

import { userService } from "../../services";
import { filterUsers } from "../../utils";
import { Plus } from "lucide-react";

import { useDispatch } from "react-redux";
import { showNotification } from "../../Store/Slice/notificationSlice";

const Users = () => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateUser = async (formData) => {
    if (!selectedUser) return;

    try {
      setUpdating(true);

      const oldUsername = selectedUser.username;
      const newUsername = formData.username.trim();

      if (newUsername !== oldUsername) {
        await userService.updateUsername(oldUsername, newUsername);
      }

      if (formData.role !== selectedUser.role) {
        await userService.updateUserRole(newUsername, formData.role);
      }

      setSelectedUser(null);
      await fetchUsers();
    } catch (error) {
      const detail = error.response?.data?.detail;

      const errorMessage = Array.isArray(detail)
        ? detail.map((item) => item.msg).join(", ")
        : typeof detail === "string"
          ? detail
          : "Failed to update user.";

      dispatch(
        showNotification({
          message: errorMessage,
          type: "error",
        }),
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      setCreating(true);

      await userService.createUser(formData);

      setIsCreateModalOpen(false);
      await fetchUsers();

      dispatch(
        showNotification({
          message: "User created successfully.",
          type: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: error.response?.data?.detail || "Failed to create user.",
          type: "error",
        }),
      );
    } finally {
      setCreating(false);
    }
  };

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await userService.getUsers();
      dispatch(
        showNotification({
          message: "User updated successfully.",
          type: "success",
        }),
      );
      setUsers(response.users || []);
    } catch (error) {
      console.error(error.response?.data?.detail || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(
    () => filterUsers(users, search, role),
    [users, search, role],
  );

  const handleClearFilters = () => {
    setSearch("");
    setRole("all");
  };

  // More logic will be added here.

  return (
    <div className="space-y-6">
      {/* user summary */}
      <UserStats users={users} />

      {/* create user */}
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} strokeWidth={3} />
          <span>Create User</span>
        </Button>
      </div>

      {/* User Filters */}
      <UserFilters
        search={search}
        onSearchChange={setSearch}
        role={role}
        onRoleChange={setRole}
        onClear={handleClearFilters}
      />

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        loading={loading}
        onEdit={handleEditUser}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New User"
        description="Add a new user and assign an appropriate role."
        size="md"
      >
        <UserForm onSubmit={handleCreateUser} loading={creating} />
      </Modal>

      <Modal
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        title="Edit User"
        description="Update the username and assigned role."
        size="md"
      >
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
            onSubmit={handleUpdateUser}
            loading={updating}
          />
        )}
      </Modal>
    </div>
  );
};

export default Users;
