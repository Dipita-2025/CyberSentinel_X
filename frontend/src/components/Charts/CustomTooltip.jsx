import React from "react";

function CustomTooltip({
  active,
  payload,
  type = "",
  labelName = "",
  valueName = "",
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <div
      className={`bg-(--bg) text-xs border border-(--accent-border) rounded-sm  p-2 ${type === "pie" ? "flex gap-2" : "text-center"}`}
    >
      <p className="text-(--accent) font-semibold">{item[labelName]}</p>

      <p className="text-(--text)">
        {item[valueName]}
        {type === "pie" ? "%" : ""}
      </p>
    </div>
  );
}

export default CustomTooltip;
