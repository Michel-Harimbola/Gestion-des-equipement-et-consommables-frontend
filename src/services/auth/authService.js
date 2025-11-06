import axiosInstance from "../configs/axios";

export const authService = {
  async login(credentials) {
    const res = await axiosInstance.post("/auth/login", credentials);
    return res.data;
  },

  async register(data) {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
  },

  logout() {
    localStorage.removeItem("token");
  },
};
