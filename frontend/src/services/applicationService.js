import api from "../config/api";

const applicationService = {
  getApplications: async () => {
    const response = await api.get("/applications");
    return response.data;
  },

  createApplication: async (applicationData) => {
    const response = await api.post("/applications", applicationData);
    return response.data;
  },
};

export default applicationService;
