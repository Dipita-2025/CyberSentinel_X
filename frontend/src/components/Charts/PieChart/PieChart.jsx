import { PieChart, Pie, Label, Cell, Tooltip } from "recharts";
import CustomTooltip from "../CustomTooltip";

const COLORS = {
  low: "#63d79b",
  medium: "#ffd666",
  high: "#ff9c6e",
  critical: "#ff4d4f",
  extra: "#0e131f",
};

export default function PieChartComponent({ data = [] }) {
  if (!data.length) {
    return null;
  }

  return (
    <div className="flex h-fit w-full max-w-50 items-center justify-center outline-none **:outline-none">
      <PieChart
        responsive
        className="aspect-square h-full w-full outline-none focus:outline-none focus-visible:outline-none"
      >
        {/* pie chart */}
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius="100%"
          innerRadius="70%"
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[entry.intencity]}
              stroke="none"
              className="rounded-sm"
            />
          ))}
        </Pie>

        {/* tooltip */}
        <Tooltip
          content={
            <CustomTooltip labelName="intencity" valueName="value" type="pie" />
          }
          isAnimationActive={false}
        />
      </PieChart>
    </div>
  );
}
