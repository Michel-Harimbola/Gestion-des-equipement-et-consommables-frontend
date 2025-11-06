import axiosInstance from "../../configs/axios";

export const equipementService = {
  async getAll() {
    const response = await axiosInstance.get("/equipement");
    return response.data;
  },
};
