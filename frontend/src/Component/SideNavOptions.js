import {
  Activity,
  CircleCheckBig,
  Cpu,
  Globe,
  LockKeyhole,
  Network,
  Shield,
  ShieldCheck,
  ShieldCog,
  TrendingUp,
  Users,
} from "lucide-react";

const SideNavOptions = {
  admin: [
    { id: "admin-overview", label: "Admin Overview", Icon: Shield },
    { id: "user-management", label: "User Management", Icon: Users },
    { id: "role-management", label: "Role Management", Icon: ShieldCog },
    {
      id: "application-management",
      label: "Application Management",
      Icon: Network,
    },
    {
      id: "permission-management",
      label: "Permission Management",
      Icon: LockKeyhole,
    },
    { id: "access-logs", label: "Access Logs", Icon: Activity },
    {
      id: "security-analytics",
      label: "Security Analytics",
      Icon: TrendingUp,
    },
    {
      id: "approval-management",
      label: "Approval Management",
      Icon: CircleCheckBig,
    },
    { id: "settings", label: "Settings", Icon: Cpu },
  ],
  security_analyst: [
    { id: "security-overview", label: "Security Overview", Icon: ShieldCheck },
    { id: "threat-monitoring", label: "Threat Monitoring", Icon: Activity },
    { id: "access-logs", label: "Access Logs", Icon: Network },
    { id: "ml-analytics", label: "ML Analytics", Icon: TrendingUp },
    { id: "review-requests", label: "Review Requests", Icon: CircleCheckBig },
    { id: "reports", label: "Reports", Icon: Globe },
  ],
  developer: [
    { id: "developer-overview", label: "Developer Overview", Icon: Shield },
    {
      id: "available-applications",
      label: "Available Applications",
      Icon: Globe,
    },
    {
      id: "source-code-management",
      label: "Source Code Management",
      Icon: Network,
    },
    { id: "my-access-history", label: "My Access History", Icon: Activity },
  ],
  employee: [
    { id: "employee-overview", label: "Employee Overview", Icon: Shield },
    {
      id: "available-applications",
      label: "Available Applications",
      Icon: Globe,
    },
    {
      id: "employee-management",
      label: "Employee Management",
      Icon: Users,
    },
    { id: "my-access-history", label: "My Access History", Icon: Activity },
  ],
};

export default SideNavOptions;
