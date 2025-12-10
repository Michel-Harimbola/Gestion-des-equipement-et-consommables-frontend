import axiosInstance from "../../configs/axios";

const UtilisationConsommableService = {
  async createUtilisation(data) {
    const res = await axiosInstance.post("/utilisation/create", data);
    return res.data;
  },

  async getAllUtilisations(page = 1, limit = 12) {
    const res = await axiosInstance.get(`/utilisation?page=${page}&limit=${limit}`);
    return res.data;
  },

  searchUtilisation: async (q, page = 1, limit = 12) => {
    const res = await axiosInstance.get("/utilisation/search", { params: { q, page, limit } });
    return res.data;
  },

  async deleteUtilisation(id) {
    await axiosInstance.delete(`/utilisation/${id}`);
    return id;
  },

  async updateUtilisation(id, data) {
    const res = await axiosInstance.put(`/utilisation/${id}`, data);
    return res.data;
  },
};

export default UtilisationConsommableService;
