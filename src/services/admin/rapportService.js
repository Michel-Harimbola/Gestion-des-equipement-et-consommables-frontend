import axiosInstance from "../../configs/axios";

const rapportService = {
  getAll: async (page = 1, limit = 12) => {
    const res = await axiosInstance.get(`/rapport?page=${page}&limit=${limit}`);
    return res.data;
  },

  remove: async (id) => {
    const res = await axiosInstance.delete(`/rapport/${id}`);
    return res.data;
  },
};

export default rapportService;