import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "../CustomTooltip";

function LineGraph({
  data = [],
  xKey = "month",
  yKey = "threats",
  xLabel = "Month",
  yLabel = "Threats",
}) {
  if (!data.length) {
    return null;
  }

  return (
    <div className="flex h-75 w-full items-center justify-center rounded-xl outline-none **:outline-none">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="mx-auto box-border rounded-md border border-(--border) bg-(--accent-bg) px-0.5 py-2 outline-none focus:outline-none focus-visible:outline-none md:px-2"
      >
        <LineChart
          data={data}
          margin={{
            top: 15,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          {/* Custom Tooltip */}
          <Tooltip
            content={
              <CustomTooltip type="line" labelName={xKey} valueName={yKey} />
            }
            isAnimationActive={false}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey={yKey}
            stroke="#00c2ff"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#00c2ff",
              stroke: "#08111f",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
            }}
          />
          <XAxis
            dataKey={xKey}
            className="text-xxs"
            tickMargin={8}
            height={30}
          />
          <YAxis className="text-xxs" width={45} tickMargin={8} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGraph;
