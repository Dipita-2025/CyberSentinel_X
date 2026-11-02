import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Logo({ height = "h-12" }) {
  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.auth.isLogin);
  const isLogin = false;

  // logo
  return (
    <div
      className={`@container w-full ${height.trim()} max-w-50 flex justify-start items-center gap-2`}
      onClick={() => (isLogin ? navigate("/login") : navigate("/"))}
    >
      {/* logo image */}
      <div className="h-10 w-full @min-[12rem]:w-10 bg-[url('/logo.png')] bg-no-repeat bg-contain @min-[12rem]:bg-cover bg-center aspect-square"></div>

      {/* logo text */}
      <div className="text-base xl:text-lg/5 hidden @min-[12rem]:block  ">
        <p className="font-bold">
          CyberSentinel&nbsp;<span className="text-(--accent)">X</span>
        </p>
        <p className="text-xs text-(--text-sec) font-semibold text-nowrap">
          AI-Powered Security Agent
        </p>
      </div>
    </div>
  );
}

export default Logo;
