import api from "../config/api";

const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  const data = response.data;

  if (!data.access_token) {
    throw new Error("Authentication token not received");
  }

  const user = {
    username: data.username,
    role: data.role,
  };

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("auth_user", JSON.stringify(user));

  return user;
};

const getCurrentUser = async () => {
  const response = await api.get("/my-applications");

  const savedUser = JSON.parse(localStorage.getItem("auth_user"));

  if (!savedUser) {
    throw new Error("User session not found");
  }

  return savedUser;
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth_user");
};

const authService = {
  login,
  getCurrentUser,
  logout,
};

export default authService;
