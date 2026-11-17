function UserStatusToggle({
  isActive = false,
  onChange,
  label = "User status",
  disabled = false,
}) {
  return (
    <div className="flex items-center justify-between gap-12">
      <span className="text-body text-(--text)">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        aria-label={`${label}: ${isActive ? "active" : "inactive"}`}
        disabled={disabled}
        onClick={() => onChange?.(!isActive)}
        className={`relative inline-flex h-24 w-44 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          isActive ? "bg-(--allow)" : "bg-(--border)"
        }`}
      >
        <span
          aria-hidden="true"
          className={`size-18 rounded-full bg-white transition-transform ${
            isActive ? "translate-x-24" : "translate-x-3"
          }`}
        />
      </button>
      <span className="min-w-52 text-right text-caption text-(--text-muted)">
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

export default UserStatusToggle;
