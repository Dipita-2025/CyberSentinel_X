import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Logo({ fontSize = "text-base" }) {
  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.auth.isLogin);
  const isLogin = false;

  // logo
  return (
    <div
      className={`@container w-full  max-w-50 flex justify-start items-center gap-1`}
      onClick={() => (isLogin ? navigate("/login") : navigate("/"))}
    >
      {/* logo image */}
      <div className="h-10 w-full @min-[12rem]:w-10 bg-[url('/logo2.png')] bg-no-repeat bg-contain @min-[12rem]:bg-cover bg-center aspect-square"></div>

      {/* logo text */}
      {/* <div> */}
      <div className={`hidden @min-[12rem]:flex items-center`}>
        <p className="text-lg font-bold text-center leading-none">
          CyberSentinel
        </p>
        <p className="text-(--accent) text-3xl! font-bold leading-none">X</p>
        {/* </div> */}
        {/* <p className="text-xxs text-(--text-sec) font-semibold text-nowrap">
          AI COGNITIVE SOC
        </p> */}
      </div>
    </div>
  );
}

export default Logo;
