import axiosInstance from "../../configs/axios";

const UtilisationConsommableService = {
  async createUtilisation(data) {
    const res = await axiosInstance.post("/utilisation/create", data);
    return res.data;
  },

  async getAllUtilisations() {
    const res = await axiosInstance.get("/utilisation");
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
