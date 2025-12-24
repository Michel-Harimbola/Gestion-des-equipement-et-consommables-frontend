import axiosInstance from "../../configs/axios";

export const authService = {
  async login(credentials) {
    const res = await axiosInstance.post("/auth/login", credentials);
    return res.data;
  },

  async register(data) {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
  },

  async changePassword(id, data) {
    const res = await axiosInstance.patch(`/auth/${id}/changePassword`,data);
    return res.data;
  }
};
