import axiosInstance from "../../configs/axios";

const EquipementSevice = {
    getAll: async () => {
        const res = await axiosInstance.get("/equipement/");
        return res.data;
    },

    create: async (data) => {
        const res = await axiosInstance.create("/equipement/create", data);
        return res.data;
    },

    update: async (id, data) => {
        const res = await axiosInstance.update(`/equipement/${id}`, data);
        return res.data;
    },

    delete: async (id) => {
        const res = await axiosInstance.delete(`/equipement/${id}`);
        return res.data;
    }
 };

 export default EquipementSevice;