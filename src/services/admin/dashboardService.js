import axiosInstance from "../../configs/axios";

const DashboardService = {
    getStats: async () => {
        const res = await axiosInstance.get("/dashboard/stats");
        return res.data;
    },

    getEmpruntsParMois: async () => {
        const res = await axiosInstance.get("/dashboard/empruntsParMois");
        return res.data;
    },

    getEquipementsStatus: async () => {
        const res = await axiosInstance.get("/dashboard/equipementsStatus");
        return res.data;
    }
};

export default DashboardService;