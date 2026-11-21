import { createBrowserRouter } from "react-router-dom";

import Landing from "../pages/common/Landing";

import {
  ProtectedRoute,
  PublicRoute,
  RoleRoute,
  RoleRedirect,
} from "../components/common";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import {
  AdminOverview,
  Users,
  Applications,
  Roles,
  Permissions,
  AccessLogs,
  SecurityAnalytics,
} from "../pages/admin";
import AnalystOverview from "../pages/analyst/AnalystOverview";
import DeveloperOverview from "../pages/developer/DeveloperOverview";
import EmployeeOverview from "../pages/employee/EmployeeOverview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            element: <RoleRoute allowedRoles={["admin"]} />,
            children: [
              {
                path: "/admin/dashboard",
                element: <AdminOverview />,
              },
              {
                path: "/admin/users",
                element: <Users />,
              },
              {
                path: "/admin/applications",
                element: <Applications />,
              },
              {
                path: "/admin/roles",
                element: <Roles />,
              },
              {
                path: "/admin/permissions",
                element: <Permissions />,
              },
              {
                path: "/admin/logs",
                element: <AccessLogs />,
              },
              {
                path: "/admin/analytics",
                element: <SecurityAnalytics />,
              },
            ],
          },
          {
            element: <RoleRoute allowedRoles={["security analyst"]} />,
            children: [
              {
                path: "/analyst/dashboard",
                element: <AnalystOverview />,
              },
            ],
          },
          {
            element: <RoleRoute allowedRoles={["developer"]} />,
            children: [
              {
                path: "/developer/dashboard",
                element: <DeveloperOverview />,
              },
            ],
          },
          {
            element: <RoleRoute allowedRoles={["employee"]} />,
            children: [
              {
                path: "/employee/dashboard",
                element: <EmployeeOverview />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
