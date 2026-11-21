import { useState } from "react";
import { Input, Textarea, Button } from "../../../components/ui";

const RoleForm = ({
  onSubmit,
  roles = [],
  applications = [],
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    role_name: "",
    description: "",
  });

  const [selectedApplications, setSelectedApplications] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleApplicationToggle = (appName) => {
    setSelectedApplications((prev) =>
      prev.includes(appName)
        ? prev.filter((name) => name !== appName)
        : [...prev, appName],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const trimmedName = formData.role_name.trim();

    if (!trimmedName) {
      newErrors.role_name = "Role name is required.";
    } else {
      const duplicate = roles.some(
        (role) =>
          role.role_name?.trim().toLowerCase() === trimmedName.toLowerCase(),
      );

      if (duplicate) {
        newErrors.role_name = "This role already exists.";
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.({
      role_name: trimmedName,
      description: formData.description.trim(),
      selectedApplications,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Role Details */}
      <div className="space-y-4">
        <Input
          label="Role Name"
          name="role_name"
          placeholder="Enter role name"
          value={formData.role_name}
          onChange={handleChange}
          error={errors.role_name}
          required
          disabled={loading}
        />

        <Textarea
          label="Description"
          name="description"
          placeholder="Describe the responsibilities of this role..."
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          rows={4}
          required
          disabled={loading}
        />
      </div>

      {/* Application Permissions */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-primary-text">
            Application Permissions
          </h3>

          <p className="mt-1 text-xs text-muted">
            Select the applications this role can access.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-lg border border-border bg-elevated p-4">
            <p className="text-sm text-muted">No applications available.</p>
          </div>
        ) : (
          <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-border p-3">
            {applications.map((application) => (
              <label
                key={application.app_id}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-elevated"
              >
                <input
                  type="checkbox"
                  checked={selectedApplications.includes(application.app_name)}
                  onChange={() => handleApplicationToggle(application.app_name)}
                  disabled={loading}
                  className="size-4 shrink-0 accent-accent"
                />

                <div className="min-w-0">
                  <p className="text-sm font-medium text-primary-text">
                    {application.app_name}
                  </p>

                  <p className="text-xs text-muted">
                    {application.description || "No description available"}
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}

        <p className="text-xs text-muted">
          {selectedApplications.length} application(s) selected
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" loading={loading} disabled={loading}>
          Create Role
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;
