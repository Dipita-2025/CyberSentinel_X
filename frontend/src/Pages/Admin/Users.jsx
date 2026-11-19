import { useCallback, useEffect, useMemo, useState } from "react";

import { Notification, Modal, Button } from "../../components/ui";
import {
  UserTable,
  UserFilters,
  UserForm,
  EditUserForm,
  UserStats,
} from "../../features/users/components";

import { userService } from "../../services";
import { filterUsers } from "../../utils";

const handleEditUser = (user) => {
  setSelectedUser(user);
};

const Users = () => {
  const [updating, setUpdating] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    type: "error",
    message: "",
  });

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

      setNotification({
        type: "success",
        message: "User updated successfully.",
      });

      setSelectedUser(null);
      await fetchUsers();
    } catch (error) {
      const detail = error.response?.data?.detail;

      const errorMessage = Array.isArray(detail)
        ? detail.map((item) => item.msg).join(", ")
        : typeof detail === "string"
          ? detail
          : "Failed to update user.";

      setNotification({
        type: "error",
        message: errorMessage,
      });
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      setCreating(true);

      const response = await userService.createUser(formData);

      setNotification({
        type: "success",
        message: response.message || "User created successfully.",
      });

      setIsCreateModalOpen(false);
      await fetchUsers();
    } catch (error) {
      setNotification({
        type: "error",
        message: error.response?.data?.detail || "Failed to create user.",
      });
    } finally {
      setCreating(false);
    }
  };

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await userService.getUsers();

      setUsers(response.users || []);
    } catch (error) {
      setNotification({
        type: "error",
        message: error.response?.data?.detail || "Failed to fetch users.",
      });
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
        <Button onClick={() => setIsCreateModalOpen(true)}>Create User</Button>
      </div>

      {/* Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: "error", message: "" })}
      />

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
