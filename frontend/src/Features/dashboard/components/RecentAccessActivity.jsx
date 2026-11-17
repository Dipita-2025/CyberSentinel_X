const activities = [
  {
    id: "REQ-1048",
    user: "Ava Patel",
    application: "Source Code Management",
    decision: "Allowed",
    time: "2 min ago",
  },
  {
    id: "REQ-1047",
    user: "Noah Kim",
    application: "Database Management",
    decision: "Review",
    time: "8 min ago",
  },
  {
    id: "REQ-1046",
    user: "Mia Chen",
    application: "Employee Management",
    decision: "Blocked",
    time: "14 min ago",
  },
  {
    id: "REQ-1045",
    user: "Leo Martin",
    application: "Security Analytics Dashboard",
    decision: "Allowed",
    time: "21 min ago",
  },
];

const decisionStyles = {
  Allowed: "bg-(--allow)/10 text-(--allow)",
  Review: "bg-(--review)/10 text-(--review)",
  Blocked: "bg-(--blocked)/10 text-(--blocked)",
};

function RecentAccessActivity() {
  return (
    <section className="overflow-hidden rounded-lg border border-(--border) bg-(--sidebar)">
      <div className="flex items-center justify-between gap-12 border-b border-(--border) p-16">
        <div>
          <h2 className="text-head-sec font-semibold text-(--text)">
            Recent Access Activity
          </h2>
          <p className="mt-6 text-caption text-(--text-muted)">
            Latest access decisions across the workspace
          </p>
        </div>
        <span className="shrink-0 text-caption text-(--text-muted)">
          Sample data
        </span>
      </div>

      <ul className="divide-y divide-(--border)">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-12 p-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto]"
          >
            <div className="min-w-0">
              <p className="truncate text-body font-medium text-(--text)">
                {activity.user}
              </p>
              <p className="mt-4 text-caption text-(--text-muted)">
                {activity.id}
              </p>
            </div>
            <p className="col-span-2 truncate text-caption text-(--text-muted) md:col-span-1">
              {activity.application}
            </p>
            <span
              className={`justify-self-start rounded-full px-10 py-6 text-caption font-medium ${decisionStyles[activity.decision]}`}
            >
              {activity.decision}
            </span>
            <time className="text-right text-caption text-(--text-muted)">
              {activity.time}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentAccessActivity;
