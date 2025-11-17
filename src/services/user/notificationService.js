import axiosInstance from "../../configs/axios";

const notificationService = {
    getUserNotification: async () => {
        const res = await axiosInstance.get("/notification/userNotification");
        return res.data;
    },

    markAllAsRead: async () => {
        const res = await axiosInstance.patch("/notification/read-all");
        return res.data;
    }
};

export default notificationService;