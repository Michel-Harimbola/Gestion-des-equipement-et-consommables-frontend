import axiosInstance from "../configs/axios";

export const empruntService = {
  async getUserEmprunts() {
    const response = await axiosInstance.get("/emprunt/userEmprunts");
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