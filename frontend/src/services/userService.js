import api from "../config/api";

const userService = {
  getUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  updateUserRole: async (username, role) => {
    const response = await api.put(
      `/users/${encodeURIComponent(username)}/role`,
      { role },
    );

    return response.data;
  },

  updateUsername: async (oldUsername, newUsername) => {
    const response = await api.put(
      `/users/${encodeURIComponent(oldUsername)}/rename`,
      null,
      {
        params: { new_username: newUsername },
      },
    );
    return response.data;
  },

  updateUserRole: async (username, role) => {
    const response = await api.put(
      `/users/${encodeURIComponent(username)}/role`,
      { role_name: role },
    );

    return response.data;
  },
};

export default userService;
