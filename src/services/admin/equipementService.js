import axiosInstance from "../../configs/axios";

const EquipementSevice = {
    getAll: async (page = 1, limit = 11) => {
        const res = await axiosInstance.get(`/equipement?page=${page}&limit=${limit}`);
        return res.data;
    },
    async searchEquipements(q, page = 1, limit = 11) {
        const response = await axiosInstance.get("/equipement/search", { params: { q, page, limit } });
        return response.data;
    },

    create: async (data) => {
        const res = await axiosInstance.post(
            "/equipement/create",
            data,
            {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            }
        );
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