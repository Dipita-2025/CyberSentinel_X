import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";

import {
  AdminSidebar,
  SecurityAnalystSidebar,
  DeveloperSidebar,
  EmployeeSidebar,
} from "../components/navigation";

import { PageHeader } from "../components/common";

const WORKSPACE_CONFIG = {
  admin: {
    title: "Admin Workspace",
    Sidebar: AdminSidebar,
  },
  "security analyst": {
    title: "Security Workspace",
    Sidebar: SecurityAnalystSidebar,
  },
  developer: {
    title: "Developer Workspace",
    Sidebar: DeveloperSidebar,
  },
  employee: {
    title: "Employee Workspace",
    Sidebar: EmployeeSidebar,
  },
};

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = useSelector((state) => state.auth.user?.role);
  const normalizedRole = role?.trim().toLowerCase();

  const workspace = WORKSPACE_CONFIG[normalizedRole];
  const Sidebar = workspace?.Sidebar;

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen w-full bg-background text-primary-text">
      {/* Role-based Sidebar */}
      {Sidebar && <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />}

      {/* Main Workspace */}
      <div className="min-h-screen min-w-0 lg:ml-64">
        {/* Workspace Header */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border bg-sidebar px-4 sm:px-6 lg:px-8">
          {/* Mobile Sidebar Toggle */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
            className="mr-3 rounded-lg p-2 text-muted transition-colors hover:bg-elevated hover:text-primary-text lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div>
            <h2 className="text-sm font-semibold text-primary-text">
              {workspace?.title || "CyberSentinel Workspace"}
            </h2>

            <p className="text-caption text-muted">
              Security Management Console
            </p>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <PageHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
