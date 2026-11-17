import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// store
import { Provider } from "react-redux";
import store from "./store/store.js";

// routing
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router";

// Layouts
import { AdminLayout, AuthLayout } from "./Layouts/index.js";

// common pages
import {
  HomePage,
  LoginPage,
  ChangePasswordPage,
  ForgetPasswordPage,
} from "./Pages/common/index.js";

// admin pages
import {
  CreateUserPage,
  Dashboard,
  EditUserPage,
  RoleManagementPage,
  UserDetailsPage,
  UsersPage,
} from "./Pages/Admin/index.js";

// import Login from "./AuthForms/Login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "roles",
            element: <RoleManagementPage />,
          },
          {
            path: "users/new",
            element: <CreateUserPage />,
          },
          {
            path: "users/:userId/edit",
            element: <EditUserPage />,
          },
          {
            path: "users/:userId",
            element: <UserDetailsPage />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <LoginPage />,
          },
          {
            path: "forget-password",
            element: <ForgetPasswordPage />,
          },
          {
            path: "change-password",
            element: <ChangePasswordPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
