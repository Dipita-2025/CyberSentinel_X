import { Bell, Menu } from "lucide-react";
import { useSelector } from "react-redux";

function Header({
  onMenuClick,
  isMenuOpen = false,
  onNotificationClick,
  className = "",
}) {
  const role = useSelector((state) => state.auth.userData?.role ?? "Guest");

  return (
    <header
      className={`flex w-full items-center justify-between border-b border-(--border) bg-(--sidebar) px-20 py-12 ${className}`}
    >
      <div className="flex items-center gap-8">
        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={isMenuOpen}
          onClick={onMenuClick}
          className="flex size-40 items-center justify-center rounded-md border border-(--border) bg-(--card) text-(--text-muted) transition-colors hover:bg-(--elevated) hover:text-(--text) md:hidden"
        >
          <Menu aria-hidden="true" size={18} />
        </button>
        <span className="text-body text-(--text-muted)">
          {role[0].toUpperCase() + role.slice(1) + " "}
          wrokplace
        </span>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        onClick={onNotificationClick}
        className="flex size-40 items-center justify-center rounded-md border border-(--border) bg-(--card) text-(--text-muted) transition-colors hover:bg-(--elevated) hover:text-(--text)"
      >
        <Bell aria-hidden="true" size={18} />
      </button>
    </header>
  );
}

export default Header;
