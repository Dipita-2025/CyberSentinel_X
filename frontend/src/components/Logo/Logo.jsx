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
      className={` w-fit  flex gap-2 justify-center items-center ${height.trim()}`}
      onClick={() => (isLogin ? navigate("/login") : navigate("/"))}
    >
      {/* logo image */}
      <div className="bg-[url('/logo.png')] bg-cover bg-no-repeat h-full  aspect-square "></div>

      {/* logo text */}
      <div className="text-xs">
        <p className="font-bold text-[20px] ">
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
