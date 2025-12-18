import axiosInstance from "../../configs/axios";

const notificationService = {
    getAllActif: async () => {
        const res = await axiosInstance.get("/notification/actif");
        return res.data;
    },
    ReadAll: async (page = 1, limit = 11) => {
        const res = await axiosInstance.get(`/notification?page=${page}&limit=${limit}`);
        return res.data;
    },
    remove: async (id) => {
        const res = await axiosInstance.delete(`/notification/${id}`);
    }
};

export default notificationService;