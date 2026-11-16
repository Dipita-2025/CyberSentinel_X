import React from "react";

function MediumTag({ text = "Medium" }) {
  return (
    <div className="w-fit px-2 py-1 bg-(--medium-bg) rounded-md">
      <p className="text-xxs text-(--medium) font-semibold">{text}</p>
    </div>
  );
}

export default MediumTag;
