import { Dot, Sparkles } from "lucide-react";
import React from "react";
import { LiveTag } from "../../components";

function Header({ heading = "", desc = "", live = false }) {
  const threatLevel = "low";
  return (
    <div className="xl:px-6 xl:bg-(--bg-sec) xl:border-b xl:border-(--border) flex flex-col xl:flex-row justify-start xl:justify-between lg:items-center">
      {/* header section */}
      <div className="w-full md:h-18 bg-(--bg-sec) border-b xl:border-b-0 border-(--border) p-5 md:p-6 xl:p-0 flex flex-col items-start justify-between md:justify-center gap-2 xl:gap-0">
        {/* header text section and live tag  */}
        <div className=" flex items-center gap-20">
          {/* heading */}
          <p className="text-2xl font-bold">{heading}</p>

          {/* live tag */}
          <div className="hidden xl:block">{live && <LiveTag />}</div>
        </div>

        {/* description */}
        <p className="text-md text-(--text-sec)">{desc}</p>
      </div>

      {/* AI tag and threat level section */}
      <div className="w-full xl:w-fit bg-(--bg-sec) border-b xl:border  border-(--border) xl:rounded-md px-5 py-3 xl:px-3 flex flex-col md:flex-row items-start md:items-center justify-start xl:justify-center gap-3 md:gap-6">
        {/* AI */}
        <div className="flex  items-center gap-2">
          <Sparkles size={20} className="text-(--accent)" />
          <p className="text-xxs text-(--text-sec) text-nowrap">
            AI Cognitive Engine Active
          </p>
        </div>

        {/* threat level change color based on the level */}
        <p
          className={`text-xxs font-semibold text-nowrap  ${
            threatLevel === "critical"
              ? "text-(--critical)"
              : threatLevel === "high"
                ? "text-(--high)"
                : threatLevel === "medium"
                  ? "text-(--medium)"
                  : "text-(--low)"
          }`}
        >
          Threat Level:{" "}
          {threatLevel === "critical"
            ? "Ciritical(Red)"
            : threatLevel === "high"
              ? "Elevated(Orange)"
              : threatLevel === "medium"
                ? "Medium(Yellow)"
                : "Low(Green)"}
        </p>
      </div>
    </div>
  );
}

export default Header;
