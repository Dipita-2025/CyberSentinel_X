import React from "react";

function CriticalTag({ text = "Critical" }) {
  return (
    <div className="w-fit px-2 py-1 bg-(--critical-bg) rounded-md">
      <p className="text-xxs text-(--critical) font-semibold">{text}</p>
    </div>
  );
}

export default CriticalTag;
