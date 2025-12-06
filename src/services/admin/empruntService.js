import axiosInstance from "../../configs/axios";

const EmpruntSevice = {
    getAll: async () => {
        const res = await axiosInstance.get("/emprunt/");
        return res.data;
    },

    getRecent: async () => {
        const res = await axiosInstance.get("/emprunt/recent");
        return res.data;
    },

    create: async (data) => {
        const res = await axiosInstance.post("/emprunt/create", data);
        return res.data;
    },

    update: async (id, data) => {
        const res = await axiosInstance.put(`/emprunt/${id}`, data);
        return res.data;
    },

    remove: async (id) => {
        const res = await axiosInstance.delete(`/emprunt/${id}`);
        return res.data;
    }
 };

 export default EmpruntSevice;