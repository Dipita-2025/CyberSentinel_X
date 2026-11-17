import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dailyDecisions = [
  { allow: 124, review: 18, block: 9 },
  { allow: 138, review: 22, block: 7 },
  { allow: 116, review: 15, block: 12 },
  { allow: 152, review: 26, block: 8 },
  { allow: 143, review: 19, block: 11 },
  { allow: 167, review: 24, block: 6 },
  { allow: 158, review: 21, block: 10 },
];

const decisionLines = [
  { key: "allow", name: "Allow", color: "var(--allow)" },
  { key: "review", name: "Review", color: "var(--review)" },
  { key: "block", name: "Block", color: "var(--blocked)" },
];

function getLastSevenDays() {
  const today = new Date();

  return dailyDecisions.map((decisions, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (dailyDecisions.length - index - 1));

    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      ...decisions,
    };
  });
}

function DecisionTrendChart() {
  const data = getLastSevenDays();

  return (
    <section className="rounded-lg border border-(--border) bg-(--sidebar) p-16">
      <div className="mb-16">
        <h2 className="text-head-sec font-semibold text-(--text)">
          Decision Trends
        </h2>
        <p className="mt-6 text-caption text-(--text-muted)">
          Daily allow, review, and block decisions · Last 7 days
        </p>
      </div>

      <div
        aria-label="Line chart showing allow, review, and block decisions for the past seven days"
        className="h-280 min-w-0"
        role="img"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              minTickGap={16}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text)",
              }}
              labelStyle={{ color: "var(--text)" }}
            />
            <Legend
              wrapperStyle={{ color: "var(--text-muted)", fontSize: "12px" }}
            />
            {decisionLines.map((decision) => (
              <Line
                key={decision.key}
                type="monotone"
                dataKey={decision.key}
                name={decision.name}
                stroke={decision.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default DecisionTrendChart;
