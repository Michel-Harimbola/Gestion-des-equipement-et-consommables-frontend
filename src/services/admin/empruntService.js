import axiosInstance from "../../configs/axios";

const EmpruntSevice = {
    getAll: async () => {
        const res = await axiosInstance.get("/emprunt/");
        return res.data;
    },

    create: async (data) => {
        const res = await axiosInstance.create("/emprunt/create", data);
        return res.data;
    },

    update: async (id, data) => {
        const res = await axiosInstance.update(`/emprunt/${id}`, data);
        return res.data;
    },

    delete: async (id) => {
        const res = await axiosInstance.delete(`/emprunt/${id}`);
        return res.data;
    }
 };

 export default EmpruntSevice;