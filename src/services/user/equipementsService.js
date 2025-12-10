import axiosInstance from "../../configs/axios";

export const equipementService = {
  async getAll(page = 1, limit = 12) {
    const response = await axiosInstance.get(`/equipement?page=${page}&limit=${limit}`);
    return response.data;
  },

  async searchEquipements(q, page = 1, limit = 12) {
    const response = await axiosInstance.get("/equipement/search", { params: { q, page, limit } });
    return response.data;
  },
};
