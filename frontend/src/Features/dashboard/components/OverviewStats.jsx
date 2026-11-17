import { Activity, CircleAlert, Network, Users } from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "1,284",
    detail: "Registered accounts",
    Icon: Users,
    color: "text-(--accent-light)",
  },
  {
    label: "Applications",
    value: "04",
    detail: "Registered applications",
    Icon: Network,
    color: "text-(--accent)",
  },
  {
    label: "Access Decisions",
    value: "892",
    detail: "In the last 24 hours",
    Icon: Activity,
    color: "text-(--allow)",
  },
  {
    label: "Pending Reviews",
    value: "12",
    detail: "Awaiting review",
    Icon: CircleAlert,
    color: "text-(--review)",
  },
];

function OverviewStats() {
  return (
    <section aria-label="Overview statistics">
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map(({ label, value, detail, Icon, color }) => (
          <article
            key={label}
            className="flex min-w-0 items-start justify-between gap-12 rounded-lg border border-(--border) bg-(--sidebar) p-16"
          >
            <div className="min-w-0">
              <p className="text-caption text-(--text-muted)">{label}</p>
              <p className="mt-8 text-head-page font-semibold text-(--text)">
                {value}
              </p>
              <p className="mt-8 text-caption text-(--text-muted)">{detail}</p>
            </div>
            <div className="shrink-0 rounded-md bg-(--accent-light-bg) p-10">
              <Icon aria-hidden="true" className={color} size={20} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OverviewStats;
