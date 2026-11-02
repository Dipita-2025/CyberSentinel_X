import { Dot, Sparkles } from "lucide-react";
import React from "react";

function Header({ headeing = "", desc = "", live = false }) {
  return (
    <div className="lg:bg-(--accent-bg) lg:border-b lg:border-(--border) flex flex-col lg:flex-row justify-start lg:justify-between items-center">
      {/* header section */}
      <div className="w-full md:h-18 bg-(--accent-bg) border-b lg:border-b-0 border-(--border) px-2 md:px-5 py-2 flex flex-col items-start justify-between md:justify-center">
        {/* header text section and live tag  */}
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-2 md:gap-5">
          {/* heading */}
          <p className="text-base xl:text-lg font-bold">{headeing}</p>

          {/* live tag */}
          {live && (
            <div className="w-fit h-5 bg-(--green-bg) border border-(--green) rounded-full pr-2 flex items-center overflow-hidden">
              <Dot strokeWidth={5} className="text-(--green)" />
              <p className="text-xxs text-(--green)">LIVE SYSTEM MONITOR</p>
            </div>
          )}
        </div>

        {/* description */}
        <p className="text-xxs lg:text-xs text-(--text-sec)">{desc}</p>
      </div>

      {/* AI tag and threat level section */}
      <div className="w-70 md:w-90 lg:w-130 bg-(--accent-bg) lg:bg-(--bg) border border-(--border) rounded-md mx-5 mt-1 px-3 py-2 md:py-1.5  flex items-center justify-between gap-1">
        {/* AI */}
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-(--accent)" />
          <p className="text-xxs md:text-xs text-(--text-sec) text-nowrap">
            AI Cognitive Engine Active
          </p>
        </div>

        {/* threat level change color based on the level */}
        <p
          className={`text-xs md:text-sm font-semibold text-nowrap  ${/* change color */ "text-(--critical)"}`}
        >
          Threat: Elevated
        </p>
      </div>
    </div>
  );
}

export default Header;
