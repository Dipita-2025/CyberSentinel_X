import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const decisions = [
  { name: "Allowed", value: 82, color: "var(--allow)" },
  { name: "Review", value: 11, color: "var(--review)" },
  { name: "Blocked", value: 7, color: "var(--blocked)" },
];

function AccessDecisionChart() {
  return (
    <section className="rounded-lg border border-(--border) bg-(--sidebar) p-16">
      <div className="mb-16">
        <h2 className="text-head-sec font-semibold text-(--text)">
          Access Decisions
        </h2>
        <p className="mt-6 text-caption text-(--text-muted)">
          Distribution by outcome · Last 24 hours
        </p>
      </div>

      <div className="grid grid-cols-1 items-center gap-16 sm:grid-cols-[minmax(0,1fr)_minmax(140px,0.8fr)]">
        <div
          aria-label="Access decision distribution: 82 percent allowed, 11 percent review, 7 percent blocked"
          className="relative h-220 min-w-0"
          role="img"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={decisions}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={84}
                paddingAngle={3}
                stroke="none"
              >
                {decisions.map((decision) => (
                  <Cell key={decision.name} fill={decision.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text)",
                }}
                formatter={(value) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-head-sec font-semibold text-(--text)">
              82%
            </span>
            <span className="text-caption text-(--text-muted)">Allowed</span>
          </div>
        </div>

        <ul className="flex flex-col gap-12">
          {decisions.map((decision) => (
            <li
              key={decision.name}
              className="flex items-center justify-between gap-8"
            >
              <span className="flex min-w-0 items-center gap-8 text-caption text-(--text-muted)">
                <span
                  aria-hidden="true"
                  className="size-8 shrink-0 rounded-full"
                  style={{ backgroundColor: decision.color }}
                />
                {decision.name}
              </span>
              <span className="text-body font-medium text-(--text)">
                {decision.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AccessDecisionChart;
