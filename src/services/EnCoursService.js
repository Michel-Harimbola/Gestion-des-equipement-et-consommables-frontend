import axiosInstance from "../configs/axios";

export const empruntService = {
  async getUserEmpruntsInProgress() {
    const response = await axiosInstance.get("/emprunt/userEmpruntsInProgress");
    return response.data;
  },
};
