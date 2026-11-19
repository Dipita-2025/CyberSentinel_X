import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

const PieChart = ({ data = [], total = 0 }) => {
  // const chartData = data.filter((item) => item.value > 0);

  return (
    <div className="relative h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={3}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>

      {/* Center Total */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-primary-text">
          {total.toLocaleString()}
        </span>

        <span className="text-caption text-muted">Total</span>
      </div>
    </div>
  );
};

export default PieChart;
