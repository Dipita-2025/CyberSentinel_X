import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  AppWindow,
  Users,
  Send,
  History,
  UserRound,
  ShieldCheck,
  X,
} from "lucide-react";

const NAVIGATION_ITEMS = [
  { label: "Overview", path: "/employee/dashboard", icon: LayoutDashboard },
  {
    label: "Available Applications",
    path: "/employee/applications",
    icon: AppWindow,
  },
  { label: "My Information", path: "/employee/information", icon: Users },
  { label: "Request Access", path: "/employee/request-access", icon: Send },
  { label: "My Access History", path: "/employee/history", icon: History },
  { label: "Profile", path: "/employee/profile", icon: UserRound },
];

const EmployeeSidebar = ({ isOpen = true, onClose }) => {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-background/70 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-border bg-sidebar
          transition-transform duration-300
          lg:static lg:z-auto lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary-text">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h1 className="text-base font-bold text-primary-text">
                CyberSentinel
              </h1>
              <p className="text-caption text-muted">Security Platform</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-muted hover:bg-elevated hover:text-primary-text lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-caption font-semibold uppercase tracking-wider text-muted">
            Employee Workspace
          </p>

          {NAVIGATION_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/employee/dashboard"}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 rounded-lg px-3 py-2.5
                text-body font-medium transition-colors
                ${
                  isActive
                    ? "border border-accent/20 bg-accent/10 text-accent-light"
                    : "text-muted hover:bg-elevated hover:text-primary-text"
                }
              `}
            >
              <Icon size={19} className="shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 border-t border-border p-4">
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-allow" />
              <span className="text-caption font-medium text-primary-text">
                Account Status
              </span>
            </div>

            <p className="mt-1 text-caption text-muted">
              Your access is monitored
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default EmployeeSidebar;
