import axiosInstance from "../configs/axios";

export const empruntService = {
  async getUserEmprunts() {
    const response = await axiosInstance.get("/emprunt/userEmprunts");
    return response.data;
  },
};
