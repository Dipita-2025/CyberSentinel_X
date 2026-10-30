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

// pages
import Login from "./pages/Auth/Login/Login.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import { Dashboard, LiveEvents } from "./pages/DashboardPages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "live-events",
            element: <LiveEvents />,
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
