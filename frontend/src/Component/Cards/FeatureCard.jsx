import React from "react";
import { ArrowRight } from "lucide-react";
function FeatureCard({ Icon, iconSize = 20, heading, desc, className = "" }) {
  // dom
  return (
    <div
      className={`w-full h-full bg-(--sidebar) rounded-lg p-16  flex flex-col items-start gap-12 ${className.trim()} `}
    >
      {/* card icon */}
      {Icon && (
        <div className="p-8   shrink-0 rounded-lg bg-(--accent-light-bg)  ">
          <Icon size={iconSize} className="text-(--accent-light)" />
        </div>
      )}

      {/* card text */}
      <div className="min-w-0">
        <h2 className="font-semibold text-body mb-8">{heading}</h2>
        <p className="text-caption text-(--text-muted)">{desc}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
