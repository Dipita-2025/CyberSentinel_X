import React from "react";
import { ArrowRight } from "lucide-react";
function HeroCards({ Icon, iconSize = 24, heading, text, className = "" }) {
  // dom
  return (
    <div
      className={`w-full h-full bg-(--bg) border rounded-lg p-2 border-(--accent) flex gap-3  ${className.trim()}`}
    >
      {/* card icon */}
      {Icon && (
        <div className="p-2 w-fit shrink-0 rounded-lg bg-(--accent-bg) border-0 border-(--accent)">
          <Icon size={iconSize} className="text-(--accent)" />
        </div>
      )}

      {/* card text */}
      <div className="min-w-0">
        <h2 className="font-bold mb-1">{heading}</h2>
        <p className="text-xs text-(--text-sec)">{text}</p>
      </div>
    </div>
  );
}

export default HeroCards;
