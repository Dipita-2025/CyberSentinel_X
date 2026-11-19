import { Users, ShieldCheck, Shield, Code, User } from "lucide-react";

import { StatCard } from "../../../components/ui";

const UserStats = ({ users = [] }) => {
  const stats = [
    {
      title: "Total Users",
      value: users.length,
      description: "Registered users",
      icon: Users,
    },
    {
      title: "Admins",
      value: users.filter((user) => user.role === "admin").length,
      description: "Administrator accounts",
      icon: ShieldCheck,
    },
    {
      title: "Security Analysts",
      value: users.filter((user) => user.role === "security_analyst").length,
      description: "Security team members",
      icon: Shield,
    },
    {
      title: "Developers",
      value: users.filter((user) => user.role === "developer").length,
      description: "Developer accounts",
      icon: Code,
    },
    {
      title: "Employees",
      value: users.filter((user) => user.role === "employee").length,
      description: "Employee accounts",
      icon: User,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default UserStats;
