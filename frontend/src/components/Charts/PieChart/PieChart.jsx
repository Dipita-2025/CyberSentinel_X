import { PieChart, Pie, Label, Cell, Tooltip } from "recharts";
import CustomTooltip from "../CustomTooltip";

const COLORS = {
  low: "#52C41A",
  midium: "#FFD666",
  high: "#FF9C6E",
  critical: "#FF4D4F",
  extra: "#0e131f",
};

export default function PieChartComponent({ data = [] }) {
  if (!data.length) {
    return null;
  }

  return (
    <div className="w-full max-w-50 h-ful flex items-center justify-center  ">
      <PieChart responsive className="w-full h-full aspect-square">
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
