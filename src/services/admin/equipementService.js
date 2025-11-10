import axiosInstance from "../../configs/axios";

const EquipementSevice = {
    getAll: async () => {
        const res = await axiosInstance.get("/equipement/");
        return res.data;
    },

    create: async (data) => {
        const res = await axiosInstance.post("/equipement/create", data);
        return res.data;
    },

    update: async (id, data) => {
        const res = await axiosInstance.put(`/equipement/${id}`, data);
        return res.data;
    },

    remove: async (id) => {
        const res = await axiosInstance.delete(`/equipement/${id}`);
        return res.data;
    }
 };

 export default EquipementSevice;