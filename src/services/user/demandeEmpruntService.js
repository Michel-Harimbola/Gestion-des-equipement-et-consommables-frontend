import axiosInstance from "../../configs/axios";

export const CreateDemandeEmpruntService = {
  async create(empruntData) {
    const response = await axiosInstance.post("/demande/create", empruntData);
    return response.data;
  },
};