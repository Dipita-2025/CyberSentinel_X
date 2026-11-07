import React from "react";
import { Dot } from "lucide-react";

function LiveTag() {
  return (
    <div className="bg-(--green-bg) h-5 flex items-center justify-center  rounded-sm px-1 pr-2 w-fit ">
      <Dot className="text-(--green) " strokeWidth={8} />
      <p className="text-xxs text-(--green) font-semibold">
        LIVE SYSTEM MONITOR
      </p>
    </div>
  );
}

export default LiveTag;
