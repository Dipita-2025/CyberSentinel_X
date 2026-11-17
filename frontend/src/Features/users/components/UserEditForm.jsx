import { useState } from "react";
import UserRoleSelector from "./UserRoleSelector";

function UserEditForm({
  user,
  roles,
  onSubmit,
  isSubmitting = false,
  className = "",
}) {
  const [username, setUsername] = useState(user.username ?? "");
  const [role, setRole] = useState(user.role ?? "");
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedUsername = username.trim();

    if (!normalizedUsername) {
      setValidationError("Username cannot be empty.");
      return;
    }

    setValidationError("");
    await onSubmit({ username: normalizedUsername, role });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-16 rounded-lg border border-(--border) bg-(--sidebar) p-16 ${className}`}
    >
      <div>
        <h2 className="text-head-sec font-semibold text-(--text)">
          Edit user
        </h2>
        <p className="mt-6 text-caption text-(--text-muted)">
          Change the username or assign a different role.
        </p>
      </div>

      <div>
        <label
          htmlFor="edit-user-username"
          className="mb-8 block text-body font-medium text-(--text-muted)"
        >
          Username
        </label>
        <input
          id="edit-user-username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setValidationError("");
          }}
          disabled={isSubmitting}
          className="h-45 w-full rounded-md border border-(--border) bg-(--card) px-12 text-body text-(--text) outline-none placeholder:text-(--text-muted) focus:border-(--accent-light) disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <UserRoleSelector
        id="edit-user-role"
        value={role}
        roles={roles}
        disabled={isSubmitting}
        onChange={setRole}
      />

      {validationError && (
        <p className="text-body text-(--blocked)" role="alert">
          {validationError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-45 items-center justify-center rounded-md bg-(--button) px-16 py-10 text-body font-medium text-(--button-text) transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

export default UserEditForm;
