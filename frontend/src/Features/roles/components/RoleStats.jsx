import { ShieldCheck, Users, FileText } from "lucide-react";
import { StatCard } from "../../../components/ui";

const RoleStats = ({ roles = [] }) => {
  const stats = [
    {
      title: "Total Roles",
      value: roles.length,
      description: "Registered system roles",
      icon: ShieldCheck,
    },
    {
      title: "Admin Roles",
      value: roles.filter((role) => role.role_name?.toLowerCase() === "admin")
        .length,
      description: "Administrative roles",
      icon: Users,
    },
    {
      title: "Role Descriptions",
      value: roles.filter((role) => role.description?.trim()).length,
      description: "Roles with descriptions",
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default RoleStats;
