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
import Logo from "../Logo/Logo";
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
      className={`w-15 md:w-65 h-fit absolute md:relative z-20 bg-(--accent-bg) ${focus ? "left-0" : "-left-15 md:left-0"} h-full flex flex-col justify-start items-center gap-10 md:px-2 border-r border-(--border) transition-[left] duration-300 ease-in-out motion-reduce:transition-none`}
    >
      <div className="@container flex flex-col w-full p-2">
        {sideNavOptions.map((option, index) => (
          <button
            key={index}
            className={`overflow-hidden flex items-center justify-center @min-[12rem]:justify-between border  h-10 p-2 aspect-square rounded-md outline-0 focus:outline-0 ${currentPage === index ? "bg-(--accent-select) border-(--accent-border)" : "bg-(--accent-bg) border-(--accent-bg)"} `}
            onClick={() => navigate(option.path)}
          >
            <div className="flex justify-center @min-[12rem]:justify-start items-center">
              <option.icon
                size={20}
                strokeWidth={2}
                className={` ${currentPage === index ? "text-(--accent)" : "text-(--text-sec)"}`}
              />
              <p
                className={`pl-2 hidden @min-[12rem]:block text-sm ${currentPage === index ? "text-(--text)" : "text-(--text-sec)"} `}
              >
                {option.name}
              </p>
            </div>
            {currentPage === index && (
              <Dot
                strokeWidth={4}
                className="text-(--accent) hidden @min-[12rem]:block"
              />
            )}
          </button>
        ))}
      </div>

      <div className="w-full p-2 rounded-lg bg-(--bg-sec) border-2 border-(--border) flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-700/40 rounded-full flex justify-center items-center">
          <User />
        </div>
        <div className="hidden md:block @min-[12rem]:block">
          <p className="text-lg/4 font-semibold ">{userData?.username}</p>
          <p className="text-sm text-(--text-sec)">{userData?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
