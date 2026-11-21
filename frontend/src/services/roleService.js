import api from "../config/api";

const roleService = {
  getRoles: async () => {
    const response = await api.get("/roles");
    return response.data;
  },

  createRole: async (roleData) => {
    const response = await api.post("/roles", roleData);
    return response.data;
  },

  getRolePermissions: async (roleName) => {
    const response = await api.get(
      `/roles/${encodeURIComponent(roleName)}/permissions`,
    );
    return response.data;
  },

  grantPermission: async (permissionData) => {
    const response = await api.post("/permissions", permissionData);
    return response.data;
  },

  revokePermission: async (permissionData) => {
    const response = await api.delete("/permissions", {
      data: permissionData,
    });
    return response.data;
  },
};

export default roleService;
