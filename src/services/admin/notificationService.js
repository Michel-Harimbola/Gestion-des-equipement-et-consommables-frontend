import axiosInstance from "../../configs/axios";

const notificationService = {
    getAllActif: async () => {
        const res = await axiosInstance.get("/notification/actif");
        return res.data;
    },
};

export default notificationService;