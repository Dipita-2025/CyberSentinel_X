import {
  LayoutDashboard,
  Users,
  Shield,
  AppWindow,
  KeyRound,
  FileText,
  Activity,
  ClipboardCheck,
  Settings,
} from "lucide-react";

export const NAVIGATION = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.view",
  },
  {
    label: "User Management",
    path: "/admin/users",
    icon: Users,
    permission: "users.view",
  },
  {
    label: "Role Management",
    path: "/admin/roles",
    icon: Shield,
    permission: "roles.view",
  },
  {
    label: "Applications",
    path: "/admin/applications",
    icon: AppWindow,
    permission: "applications.view",
  },
  {
    label: "Permissions",
    path: "/admin/permissions",
    icon: KeyRound,
    permission: "permissions.view",
  },
  {
    label: "Access Logs",
    path: "/admin/logs",
    icon: FileText,
    permission: "logs.view",
  },
  {
    label: "Security Analytics",
    path: "/admin/analytics",
    icon: Activity,
    permission: "analytics.view",
  },
  {
    label: "Approvals",
    path: "/admin/approvals",
    icon: ClipboardCheck,
    permission: "approvals.view",
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
    permission: "settings.view",
  },
];
