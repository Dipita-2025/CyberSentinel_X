import React from "react";
import { useNavigate } from "react-router";

function Logo() {
  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.auth.isLogin);
  const isLogin = false;

  // logo
  return (
    <div
      className="w-full max-w-200 flex justify-start items-center gap-1"
      onClick={() => (isLogin ? navigate("/login") : navigate("/"))}
    >
      {/* logo image */}
      <div className="h-10 bg-no-repeat bg-[url('/logo2.png')] bg-cover bg-center aspect-square"></div>

      {/* logo text */}
      {/* <div> */}
      <div className="flex items-center">
        <p className="text-head-sec text-primary-text font-bold text-center leading-none">
          CyberSentinel
        </p>
        <p className=" text-accent-light text-head-page! font-bold leading-none">
          X
        </p>
      </div>
    </div>
  );
}

export default Logo;
