import React from "react";

function CardHeader({ Icon, heading = "heading", desc = "desc" }) {
  return (
    <div className="flex gap-3 justify-start items-center">
      {Icon && (
        <div className="p-2 bg-(--accent-bg) rounded-md w-fit">
          <Icon size={20} className="text-(--accent)" />
        </div>
      )}
      <div>
        <h3 className="text-base text-(--text) font-semibold">{heading}</h3>
        <p className="text-xs text-(--text-sec)">{desc}</p>
      </div>
    </div>
  );
}

export default CardHeader;
