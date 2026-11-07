import React from "react";

function HighTag({ text = "High" }) {
  return (
    <div className="w-fit px-2 py-1 bg-(--high-bg) rounded-md">
      <p className="text-xxs text-(--high) font-semibold">{text}</p>
    </div>
  );
}

export default HighTag;
