import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Logo({ height = "h-10" }) {
  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.auth.isLogin);
  const isLogin = false;

  // logo
  return (
    <div
      className={`@container w-full flex justify-start items-center ${height.trim()}`}
      onClick={() => (isLogin ? navigate("/login") : navigate("/"))}
    >
      {/* logo image */}
      <div className="bg-[url('/logo.png')]  bg-no-repeat h-10 w-full @min-[12rem]:w-10 bg-contain @min-[12rem]:bg-cover bg-center self-center  aspect-square "></div>

      {/* logo text */}
      <div className="text-xl hidden @min-[12rem]:block pl-2">
        <p className="font-bold ">
          CyberSentinel <span className="text-(--accent) ">X</span>
        </p>
        <p className=" text-(--text-sec) text-xxs text-nowrap font-semibold">
          AI-Powered Security Agent
        </p>
      </div>
    </div>
  );
}

export default Logo;
