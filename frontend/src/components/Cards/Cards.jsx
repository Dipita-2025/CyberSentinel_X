import React from "react";

function Cards({ data = { value: "0", text: "text", color: "text-red-500" } }) {
  return (
    <div className="w-[48.5%] lg:max-w-70 border bg-(--accent-bg) border-(--border) p-3 rounded-md">
      <h4 className="mb-3 text-base text-(--text-sec) ">Header</h4>
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-1 ">
        <p className="text-xl text-(--text) font-bold">{data?.value}</p>
        <p className={`${data?.color}`}>{data.text}</p>
      </div>
    </div>
  );
}

export default Cards;
