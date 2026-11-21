import api from "../config/api";

const logService = {
  getLogs: async () => {
    const response = await api.get("/logs");
    return response.data;
  },
};

export default logService;
