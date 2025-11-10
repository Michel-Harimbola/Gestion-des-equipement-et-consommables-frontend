import axiosInstance from "../../configs/axios";

const ConsommableSevice = {
    getAll: async () => {
        const res = await axiosInstance.get("/consommable/");
        return res.data;
    },

    create: async (data) => {
        const res = await axiosInstance.post("/consommable/create", data);
        return res.data;
    },

    update: async (id, data) => {
        const res = await axiosInstance.put(`/consommable/${id}`, data);
        return res.data;
    },

    remove: async (id) => {
        const res = await axiosInstance.delete(`/consommable/${id}`);
        return res.data;
    }
 };

 export default ConsommableSevice;