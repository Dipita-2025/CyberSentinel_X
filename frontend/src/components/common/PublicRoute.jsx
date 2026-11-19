import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import RoleRedirect from "./RoleRedirect";

const PublicRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <RoleRedirect /> : <Outlet />;
};

export default PublicRoute;
