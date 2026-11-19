import { useLocation } from "react-router-dom";

const PAGE_CONFIG = {
  "/admin/dashboard": {
    title: "Overview",
    subtitle: "Monitor your security platform at a glance.",
    section: "Administration",
  },
  "/admin/users": {
    title: "User Management",
    subtitle: "Manage users, accounts and assigned roles.",
    section: "Administration",
  },
  "/admin/roles": {
    title: "Role Management",
    subtitle: "Create and manage application roles.",
    section: "Administration",
  },
  "/admin/applications": {
    title: "Application Management",
    subtitle: "Register and manage protected applications.",
    section: "Administration",
  },
  "/admin/permissions": {
    title: "Permission Management",
    subtitle: "Control application access for different roles.",
    section: "Administration",
  },
  "/admin/logs": {
    title: "Access Logs",
    subtitle: "Review and monitor application access activity.",
    section: "Security",
  },
  "/admin/analytics": {
    title: "Security Analytics",
    subtitle: "Analyze threats, trust scores and security activity.",
    section: "Security",
  },
  "/admin/approvals": {
    title: "Approval Management",
    subtitle: "Review pending access requests.",
    section: "Administration",
  },
  "/admin/settings": {
    title: "System Settings",
    subtitle: "Manage your platform configuration.",
    section: "System",
  },
};

const PageHeader = () => {
  const location = useLocation();

  const page = PAGE_CONFIG[location.pathname] || {
    title: "CyberSentinel",
    subtitle: "Security Management Console",
    section: "Workspace",
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-2 flex items-center gap-2 text-caption text-muted">
        <span>CyberSentinel</span>
        <span>/</span>
        <span>{page.section}</span>
      </div>

      <h1 className="text-head-page text-primary-text">{page.title}</h1>

      <p className="mt-2 text-body text-muted">{page.subtitle}</p>
    </div>
  );
};

export default PageHeader;
