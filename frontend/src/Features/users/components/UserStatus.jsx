const UserStatus = ({ isActive = true }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-caption font-medium ${
        isActive
          ? "bg-(--allow-bg) text-allow"
          : "bg-(--blocked-bg) text-blocked"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-allow" : "bg-blocked"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

export default UserStatus;
