import axiosInstance from "../../configs/axios";

const notificationService = {
    getAll: async () => {
        const res = await axiosInstance.get("/notification");
        return res.data;
    },
};

export default notificationService;