import { Dot, Sparkles } from "lucide-react";
import React from "react";

function Header({ headeing = "", desc = "" }) {
  return (
    <div className=" bg-(--accent-bg) border-b border-(--border) flex items-center justify-between gap-5 px-5 py-2 ">
      <div>
        <p className="text-base md:text-xl mb-1 font-bold">{headeing}</p>
        <p className="text-xxs md:text-xs text-(--text-sec) ">{desc}</p>
      </div>
    </div>
  );
}

export default Header;
