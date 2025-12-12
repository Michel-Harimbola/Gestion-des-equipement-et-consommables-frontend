import axiosInstance from "../../configs/axios";

const EmpruntSevice = {
    getAll: async (page = 1, limit = 11) => {
        const res = await axiosInstance.get(`/emprunt?page=${page}&limit=${limit}`);
        return res.data;
    },

    getRecent: async () => {
        const res = await axiosInstance.get("/emprunt/recent");
        return res.data;
    },

    searchEmprunt: async (q, page = 1, limit = 11) => {
        const res = await axiosInstance.get("/emprunt/search", { params: { q, page, limit } });
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