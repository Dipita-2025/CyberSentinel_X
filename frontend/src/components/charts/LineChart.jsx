import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChart = ({ data = [] }) => {
  return (
    <div className="h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            stroke="var(--text-muted)"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            stroke="var(--text-muted)"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              background: "var(--elevated)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text)",
            }}
          />

          <Legend />

          <Area
            type="monotone"
            dataKey="allowed"
            name="ALLOW"
            stroke="var(--allow)"
            fill="var(--allow-bg)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="review"
            name="REVIEW"
            stroke="var(--review)"
            fill="var(--review-bg)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="blocked"
            name="BLOCK"
            stroke="var(--blocked)"
            fill="var(--blocked-bg)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
