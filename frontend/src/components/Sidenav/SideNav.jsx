import React from "react";

import {
  LayoutDashboard,
  ChartNetwork,
  ShieldAlert,
  UserRoundCheck,
  Monitor,
  Waypoints,
  Brain,
  BuildingComplex,
  LockKeyholeOpen,
  Database,
  Settings,
  Dot,
  User,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function SideNav({ currentPage, focus }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const sideNavOptions = [
    {
      icon: LayoutDashboard,
      name: "Dashboard",
      path: "/dashboard/",
    },
    {
      icon: ChartNetwork,
      name: "Live Events",
      path: "/dashboard/live-events",
    },
    {
      icon: ShieldAlert,
      name: "Incidents",
      path: "/dashboard/",
    },
    {
      icon: UserRoundCheck,
      name: "Users & Risk",
      path: "/dashboard/",
    },
    {
      icon: Monitor,
      name: "Devices",
      path: "/dashboard/",
    },
    {
      icon: Waypoints,
      name: "Attack Graph",
      path: "/dashboard/",
    },
    {
      icon: Brain,
      name: "AI Investigator",
      path: "/dashboard/",
    },
    {
      icon: BuildingComplex,
      name: "Response Center",
      path: "/dashboard/",
    },
    {
      icon: LockKeyholeOpen,
      name: "Emergency Access",
      path: "/dashboard/",
    },
    {
      icon: Database,
      name: "Audit Logs",
      path: "/dashboard/",
    },
    {
      icon: Settings,
      name: "Settings",
      path: "/dashboard/",
    },
  ];

  return (
    <div
      className={`w-12 lg:w-18 xl:w-70 bg-(--accent-bg) h-[calc(100dvh-3.25rem)] md:h-[calc(100vh-4.5rem)] min-h-0 border-r border-(--border) xl:px-2 py-3 flex flex-col justify-between  items-center gap-10  fixed md:relative z-20  ${focus ? "left-0" : "-left-15 md:left-0"} top-14 md:top-auto transition-[left] duration-300 ease-in-out motion-reduce:transition-none overflow-x-clip overflow-y-hidden overscroll-none`}
    >
      {/* side nav options */}
      <div className="@container w-full p-2 aspect-square flex flex-col items-center gap-1 xl:gap-0">
        {sideNavOptions.map((option, index) => (
          <button
            key={index}
            className={`w-8 xl:w-full h-8 xl:h-10 border rounded-md outline-0 focus:outline-0 ${currentPage === index ? "bg-(--accent-select) border-(--accent-border)" : "bg-(--accent-bg) border-(--accent-bg)"} aspect-square flex items-center justify-center xl:justify-between overflow-hidden`}
            onClick={() => navigate(option.path)}
          >
            {/* button content */}
            <div className="xl:px-3 flex justify-center xl:justify-start items-center gap-2">
              {/* icon */}
              <option.icon
                size={20}
                strokeWidth={2}
                className={` ${currentPage === index ? "text-(--accent)" : "text-(--text-sec)"}`}
              />

              {/* label */}
              <p
                className={`hidden xl:block text-sm ${currentPage === index ? "text-(--text)" : "text-(--text-sec)"} `}
              >
                {option.name}
              </p>
            </div>

            {/* on selection dot icon */}
            {currentPage === index && (
              <Dot
                strokeWidth={4}
                className="text-(--accent) hidden xl:block"
              />
            )}
          </button>
        ))}
      </div>

      {/* user profile */}
      <div className="w-fit xl:w-full p-1 xl:p-2 bg-(--bg-sec)  border border-(--border) rounded-lg  flex items-center justify-center xl:justify-start xl:gap-3">
        {/* logo */}
        <div className="w-10 h-10 bg-blue-700/40 rounded-full flex justify-center items-center">
          <User size={20} />
        </div>

        {/* name and role */}
        <div className="hidden xl:block ">
          <p className="text-lg/5 font-semibold ">
            {userData?.username || "avijit"}
          </p>
          <p className="text-xs text-(--text-sec)">{userData?.role || "CEO"}</p>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
