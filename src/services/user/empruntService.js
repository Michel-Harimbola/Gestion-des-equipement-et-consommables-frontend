import axiosInstance from "../../configs/axios";

export const empruntService = {
  async getUserEmprunts(page = 1, limit = 10) {
    const response = await axiosInstance.get(`/emprunt/userEmprunts?page=${page}&limit=${limit}`);
    return response.data;
  },

  async searchUserEmprunts(q, page = 1, limit = 10) {
      const response = await axiosInstance.get("/emprunt/searchUserEmprunt", { params: { q, page, limit } });
      return response.data;
    },
    
  async getUserEmpruntsInProgress() {
    const response = await axiosInstance.get("/emprunt/userEmpruntsInProgress");
    return response.data;
  },
};

export const EnCoursService = {
};


export const CreateEmpruntService = {
  
};