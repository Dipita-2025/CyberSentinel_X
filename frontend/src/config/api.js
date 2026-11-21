import axios from "axios";
import store from "../Store/store";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const role = store.getState().auth.user?.role;

    if (role) {
      config.headers["X-User-Role"] = role;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
