import React from "react";

function Cards({
  header = "",
  value = "0",
  text = "text",
  color = "text-red-500",
}) {
  return (
    <div className="w-full border bg-(--bg-sec) flex flex-col justify-between border-(--border) p-3 rounded-md">
      <h4 className="mb-3 text-xs font-semibold text-(--text-sec) ">
        {header}
      </h4>
      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-end gap-1">
        <p className={`text-3xl  font-bold ${color}`}>{value}</p>
        <p className={`${color} text-xxs xl:font-semibold`}>{text}</p>
      </div>
    </div>
  );
}

export default Cards;
