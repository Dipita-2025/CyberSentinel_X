import { Activity, CheckCircle, AlertTriangle, ShieldX } from "lucide-react";

const AccessLogStats = ({ logs = [] }) => {
  const stats = [
    {
      label: "Total Requests",
      value: logs.length,
      icon: Activity,
      color: "var(--accent)",
      background: "var(--accent-light-bg)",
    },
    {
      label: "Allowed",
      value: logs.filter((log) => log.decision === "ALLOW").length,
      icon: CheckCircle,
      color: "var(--allow)",
      background: "var(--allow-bg)",
    },
    {
      label: "Under Review",
      value: logs.filter((log) => log.decision === "REVIEW").length,
      icon: AlertTriangle,
      color: "var(--review)",
      background: "var(--review-bg)",
    },
    {
      label: "Blocked",
      value: logs.filter((log) => log.decision === "BLOCK").length,
      icon: ShieldX,
      color: "var(--blocked)",
      background: "var(--blocked-bg)",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="card-base flex items-center justify-between p-4 sm:p-5"
          >
            <div>
              <p className="text-caption text-muted">{stat.label}</p>
              <h3 className="mt-2 text-2xl font-bold text-primary-text">
                {stat.value.toLocaleString()}
              </h3>
            </div>

            <div
              className="flex size-11 items-center justify-center rounded-xl"
              style={{ color: stat.color, backgroundColor: stat.background }}
            >
              <Icon size={21} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccessLogStats;
