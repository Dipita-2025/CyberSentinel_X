import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./app/App";
import store from "./Store/store";
import AuthProvider from "./app/AuthProvider";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
