import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Header, SideNav } from "../Component";
import SideNavOptions from "../Component/SideNavOptions";

function AdminLayout() {
  const { token, userData } = useSelector((state) => state.auth);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const role = userData?.role?.toLowerCase().replace(/-/g, "_");
  const isUsersRoute = location.pathname.startsWith("/admin/users");
  const isRolesRoute = location.pathname.startsWith("/admin/roles");
  const activeItem = isUsersRoute
    ? "user-management"
    : isRolesRoute
      ? "role-management"
      : "admin-overview";

  function handleNavigation(option) {
    if (option.id === "user-management") {
      navigate("/admin/users");
    } else if (option.id === "role-management") {
      navigate("/admin/roles");
    } else if (option.id === "admin-overview") {
      navigate("/admin");
    }
  }

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (!userData) {
    return <p role="status">Loading your account...</p>;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-(--bg)">
      <SideNav
        options={SideNavOptions.admin}
        activeItem={activeItem}
        onSelect={handleNavigation}
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          isMenuOpen={isNavOpen}
          onMenuClick={() => setIsNavOpen(true)}
          className="shrink-0"
        />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
