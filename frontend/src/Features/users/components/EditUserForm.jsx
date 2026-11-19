import { useState } from "react";
import { Input, Select, Button } from "../../../components/ui";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "security_analyst", label: "Security Analyst" },
  { value: "developer", label: "Developer" },
  { value: "employee", label: "Employee" },
];

const EditUserForm = ({ user, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    role: user?.role || "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const hasChanges =
    formData.username.trim() !== user?.username || formData.role !== user?.role;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
        placeholder="Enter username"
        required
      />

      <Select
        label="Role"
        name="role"
        value={formData.role}
        onChange={(value) => handleChange("role", value)}
        placeholder="Select a role"
        options={roleOptions}
      />

      <Button
        type="submit"
        loading={loading}
        disabled={!formData.username.trim() || !formData.role || !hasChanges}
        className="w-full"
      >
        Save Changes
      </Button>
    </form>
  );
};

export default EditUserForm;
