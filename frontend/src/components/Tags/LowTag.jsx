import React from "react";

function LowTag({ text = "Low" }) {
  return (
    <div className="w-fit px-2 py-1 bg-(--low-bg) rounded-md">
      <p className="text-xxs text-(--low) font-semibold">{text}</p>
    </div>
  );
}

export default LowTag;
