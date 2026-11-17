import { useState } from "react";
import UserRoleSelector from "./UserRoleSelector";

function UserForm({
  initialValues,
  roles,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Create user",
  className = "",
  heading = "User details",
  description = "Enter the account information and assign a role.",
  showPassword = true,
  passwordRequired = true,
}) {
  const initialUsername = initialValues?.username ?? "";
  const initialRole = initialValues?.role ?? "employee";
  const [formData, setFormData] = useState(() => ({
    username: initialUsername,
    password: "",
    role: initialRole,
  }));

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({ ...formData });
  }

  return (
    <form
      className={`flex flex-col gap-16 rounded-lg border border-(--border) bg-(--sidebar) p-16 ${className}`}
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-head-sec font-semibold text-(--text)">
          {heading}
        </h2>
        {description && (
          <p className="mt-6 text-caption text-(--text-muted)">
            {description}
          </p>
        )}
      </div>

      <div>
        <label
          className="mb-8 block text-body font-medium text-(--text-muted)"
          htmlFor="user-form-username"
        >
          Username
        </label>
        <input
          id="user-form-username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={formData.username}
          onChange={updateField}
          className="h-45 w-full rounded-md border border-(--border) bg-(--card) px-12 text-body text-(--text) outline-none placeholder:text-(--text-muted) focus:border-(--accent-light) disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        />
      </div>

      {showPassword && (
        <div>
          <label
            className="mb-8 block text-body font-medium text-(--text-muted)"
            htmlFor="user-form-password"
          >
            Password
          </label>
          <input
            id="user-form-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required={passwordRequired}
            value={formData.password}
            onChange={updateField}
            className="h-45 w-full rounded-md border border-(--border) bg-(--card) px-12 text-body text-(--text) outline-none placeholder:text-(--text-muted) focus:border-(--accent-light) disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          />
        </div>
      )}

      <UserRoleSelector
        id="user-form-role"
        value={formData.role}
        roles={roles}
        disabled={isSubmitting}
        onChange={(role) =>
          setFormData((current) => ({ ...current, role }))
        }
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-45 items-center justify-center rounded-md bg-(--button) px-16 py-10 text-body font-medium text-(--button-text) transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default UserForm;
