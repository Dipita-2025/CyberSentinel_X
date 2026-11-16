import React from "react";
import { useNavigate } from "react-router";

function Logo() {
  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.auth.isLogin);
  const isLogin = false;

  // logo
  return (
    <div
      className="w-full max-w-200 flex justify-start items-center gap-4"
      onClick={() => (isLogin ? navigate("/login") : navigate("/"))}
    >
      {/* logo image */}
      <div className="h-40 bg-no-repeat bg-[url('/logo2.png')] bg-cover bg-center aspect-square"></div>

      {/* logo text */}
      {/* <div> */}
      <div className="flex items-center">
        <p className="text-head-sec font-bold text-center leading-none">
          CyberSentinel
        </p>
        <p className="text-(--accent) text-head-page! font-bold leading-none">
          X
        </p>
      </div>
    </div>
  );
}

export default Logo;
