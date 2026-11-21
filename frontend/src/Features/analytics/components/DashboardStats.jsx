import { Users, AppWindow, ShieldCheck, Activity } from "lucide-react";

import { StatCard } from "../../../components/ui";

const DashboardStats = ({ stats = {}, loading = false }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      description: "Registered platform users",
      icon: Users,
    },
    {
      title: "Applications",
      value: stats.totalApplications ?? 0,
      description: "Registered applications",
      icon: AppWindow,
    },
    {
      title: "Total Roles",
      value: stats.totalRoles ?? 0,
      description: "Configured access roles",
      icon: ShieldCheck,
    },
    {
      title: "Access Requests",
      value: stats.totalRequests ?? 0,
      description: "Total access attempts",
      icon: Activity,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          {...card}
          value={loading ? "—" : card.value}
          description={loading ? "Loading statistics..." : card.description}
        />
      ))}
    </section>
  );
};

export default DashboardStats;
