function RoleForm({
  roleName,
  description,
  onRoleNameChange,
  onDescriptionChange,
  onSubmit,
  isSubmitting = false,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-16 rounded-lg border border-(--border) bg-(--sidebar) p-16"
    >
      <div>
        <h2 className="text-head-sec font-semibold text-(--text)">
          Create role
        </h2>
        <p className="mt-6 text-caption text-(--text-muted)">
          Add a role that can be assigned to user accounts.
        </p>
      </div>

      <div>
        <label
          htmlFor="role-name"
          className="mb-8 block text-body font-medium text-(--text-muted)"
        >
          Role name
        </label>
        <input
          id="role-name"
          name="role_name"
          value={roleName}
          onChange={(event) => onRoleNameChange(event.target.value)}
          required
          disabled={isSubmitting}
          placeholder="e.g. security_auditor"
          className="h-45 w-full rounded-md border border-(--border) bg-(--card) px-12 text-body text-(--text) outline-none placeholder:text-(--text-muted) focus:border-(--accent-light) disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="role-description"
          className="mb-8 block text-body font-medium text-(--text-muted)"
        >
          Description
        </label>
        <textarea
          id="role-description"
          name="description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          required
          disabled={isSubmitting}
          rows={3}
          className="w-full resize-y rounded-md border border-(--border) bg-(--card) px-12 py-10 text-body text-(--text) outline-none placeholder:text-(--text-muted) focus:border-(--accent-light) disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-45 items-center justify-center rounded-md bg-(--button) px-16 py-10 text-body font-medium text-(--button-text) transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Create role"}
      </button>
    </form>
  );
}

export default RoleForm;
