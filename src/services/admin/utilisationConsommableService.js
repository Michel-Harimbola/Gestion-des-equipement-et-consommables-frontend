import axiosInstance from "../../configs/axios";

const UtilisationConsommableService = {
  async createUtilisation(data) {
    const res = await axiosInstance.post("/consommable/create", data);
    return res.data;
  },

  async getAllUtilisations() {
    const res = await axiosInstance.get("/consommable/");
    return res.data;
  },

  async deleteUtilisation(id) {
    await axiosInstance.delete(`/consommable/${id}`);
    return id;
  },

  async updateUtilisation(id, data) {
    const res = await axiosInstance.put(`/consommable/${id}`, data);
    return res.data;
  },
};

export default UtilisationConsommableService;
