import api from "../config/api";

const analyticsService = {
  getDashboardData: async () => {
    const [users, applications, roles, logs] = await Promise.all([
      api.get("/users"),
      api.get("/applications"),
      api.get("/roles"),
      api.get("/logs"),
    ]);

    return {
      stats: {
        totalUsers: users.data.total_users,
        totalApplications: applications.data.total_applications,
        totalRoles: roles.data.total_roles,
        totalRequests: logs.data.total_logs,
      },
      logs: logs.data.logs || [],
    };
  },
};

export default analyticsService;
