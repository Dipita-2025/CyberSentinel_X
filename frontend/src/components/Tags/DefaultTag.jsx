import React from "react";

function DefaultTag({ text = "" }) {
  return (
    <div className="w-fit px-2 py-1 bg-(--tag-bg) rounded-md">
      <p className="text-xxs text-(--tag) font-semibold">{text}</p>
    </div>
  );
}

export default DefaultTag;
