import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthLayout({ children, auth = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (auth && isLogin !== auth) {
      navigate("/login");
    }
    if (!auth && isLogin !== auth) {
      navigate("/");
    }
    setLoader(false);
  }, [isLogin, auth, navigate]);

  // dom
  return loader ? <></> : <div className="w-full">{children}</div>;
}

export default AuthLayout;
