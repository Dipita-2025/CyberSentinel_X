import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "../CustomTooltip";

function LineGraph({ data = [] }) {
  if (!data.length) {
    return null;
  }

  return (
    <div className="w-full h-75 rounded-xl flex items-center justify-center p-4 bg-(--bg-sec)">
      <ResponsiveContainer width="100%" height="100%" className="">
        <LineChart
          className=""
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          {/* Background grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#26354a" />

          {/* Custom Tooltip */}
          <Tooltip
            content={
              <CustomTooltip
                type="line"
                labelName="month"
                valueName="threats"
              />
            }
            isAnimationActive={false}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="threats"
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGraph;
