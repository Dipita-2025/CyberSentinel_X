import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleRedirect = () => {
  const role = useSelector((state) => state.auth.user?.role);

  const dashboardRoutes = {
    admin: "/admin/dashboard",
    "security analyst": "/analyst/dashboard",
    developer: "/developer/dashboard",
    employee: "/employee/dashboard",
  };

  return <Navigate to={dashboardRoutes[role] || "/login"} replace />;
};

export default RoleRedirect;
