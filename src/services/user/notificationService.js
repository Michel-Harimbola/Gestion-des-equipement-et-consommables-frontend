import axiosInstance from "../../configs/axios";

const notificationService = {
    getUserNotification: async () => {
        const res = await axiosInstance.get("/notification/userNotification");
        return res.data;
    },
};

export default notificationService;