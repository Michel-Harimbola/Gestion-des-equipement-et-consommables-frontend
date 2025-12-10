import axiosInstance from "../../configs/axios";

const userService = {
  getAll: async (page = 1, limit = 12) => {
    const res = await axiosInstance.get(`/user?page=${page}&limit=${limit}`);
    return res.data;
  },

  getById: async (id) => {
    const res = await axiosInstance.get(`/user/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axiosInstance.post("/user/create", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axiosInstance.put(`/user/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await axiosInstance.delete(`/user/${id}`);
    return res.data;
  },
};

export default userService;