import React, { useState } from "react";
import { Outlet } from "react-router";
import { Logo, SideNav } from "../components";
import { Menu } from "lucide-react";

function DashboardLayout() {
  const [activePage, setActivePage] = useState(0);
  const [focus, setFocus] = useState(false);
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-start">
      <div className="w-full md:w-65 md:h-screen">
        <div className="flex items-center gap-5 w-full bg-(--accent-bg) p-2 px-2 border-r border-(--border)">
          <button
            type="button"
            className="w-15 md:hidden flex justify-center"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          >
            <Menu
              size={30}
              strokeWidth={2}
              className={`${focus ? "text-(--accent)" : "text-(--text)"}`}
            />
          </button>
          <Logo />
        </div>
        <SideNav currentPage={activePage} focus={focus} />
      </div>
      <div className="w-full ">
        <div className="w-full h-fit">
          <Outlet context={setActivePage} />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
