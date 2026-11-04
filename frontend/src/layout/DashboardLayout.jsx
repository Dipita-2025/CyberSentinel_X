import React, { useState } from "react";
import { Outlet } from "react-router";
import { Footer, Logo, SideNav } from "../components";
import { Menu } from "lucide-react";

function DashboardLayout() {
  const [activePage, setActivePage] = useState(0);
  const [focus, setFocus] = useState(false);
  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center items-stretch overflow-clip">
      {/* side bar and logo */}
      <div className="w-full md:w-12 lg:w-18 xl:w-70 md:h-screen shrink-0">
        {/* menu and logo */}
        <div className=" md:h-18 bg-(--accent-bg) border-b md:border-r border-(--border) py-1 flex items-center xl:justify-center gap-2">
          {/* menu button */}
          <button
            type="button"
            className="w-12 lg:w-15 md:hidden flex justify-center"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          >
            <Menu
              size={25}
              strokeWidth={2}
              className={`${focus ? "text-(--accent)" : "text-(--text)"}`}
            />
          </button>

          {/* logo */}
          <Logo />
        </div>

        {/* side nav bar */}
        <SideNav currentPage={activePage} focus={focus} />
      </div>

      {/* outlet section */}
      <div className="w-full min-w-0 h-full min-h-0 flex-1 overflow-y-auto scrollbar-hidden">
        {/* outlet */}
        <div className="w-full">
          <Outlet context={setActivePage} />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
