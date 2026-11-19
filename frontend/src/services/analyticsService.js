import api from "../config/api";

const analyticsService = {
  getDashboardStats: async () => {
    const [users, applications, roles, logs] = await Promise.all([
      api.get("/users"),
      api.get("/applications"),
      api.get("/roles"),
      api.get("/logs"),
    ]);

    return {
      totalUsers: users.data.total_users,
      totalApplications: applications.data.total_applications,
      totalRoles: roles.data.total_roles,
      totalRequests: logs.data.total_logs,
    };
  },

  getAccessLogs: async () => {
    const response = await api.get("/logs");
    return response.data.logs || [];
  },
};

export default analyticsService;
