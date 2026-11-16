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
import { AuthLayout } from "./Layouts/index.js";

// common pages
import {
  HomePage,
  LoginPage,
  ChangePasswordPage,
  ForgetPasswordPage,
} from "./Pages/common/index.js";

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
