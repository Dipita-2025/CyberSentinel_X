import { Activity, ShieldCheck, AlertTriangle, ShieldX } from "lucide-react";

import { StatCard } from "../../../components/ui";

const SecurityAnalyticsStats = ({ stats = {}, loading = false }) => {
  const cards = [
    {
      title: "Total Requests",
      value: stats.totalRequests ?? 0,
      description: "Total access attempts",
      icon: Activity,
    },
    {
      title: "Allowed Requests",
      value: stats.allowed ?? 0,
      description: "Successfully authorized",
      icon: ShieldCheck,
    },
    {
      title: "Under Review",
      value: stats.review ?? 0,
      description: "Requests requiring review",
      icon: AlertTriangle,
    },
    {
      title: "Blocked Requests",
      value: stats.blocked ?? 0,
      description: "Restricted access attempts",
      icon: ShieldX,
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

export default SecurityAnalyticsStats;
