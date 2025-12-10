import axiosInstance from "../../configs/axios";

export const empruntService = {
  async getUserEmprunts(page = 1, limit = 12) {
    const response = await axiosInstance.get(`/emprunt/userEmprunts?page=${page}&limit=${limit}`);
    return response.data;
  },
};

export const EnCoursService = {
  async getUserEmpruntsInProgress() {
    const response = await axiosInstance.get("/emprunt/userEmpruntsInProgress");
    return response.data;
  },
};

export const CreateEmpruntService = {
  async create(empruntData) {
    const response = await axiosInstance.post("/emprunt/create", empruntData);
    return response.data;
  },
};