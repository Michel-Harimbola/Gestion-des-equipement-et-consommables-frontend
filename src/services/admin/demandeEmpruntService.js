import axiosInstance from "../../configs/axios";

const demandeEmpruntService = {
    create: async (data) => {
        const res = await axiosInstance.post("/demande/emprunt", data);
        return res.data;
    },

    getAll: async (page = 1, limit = 12) => {
        const res = await axiosInstance.get(`/demande?page=${page}&limit=${limit}`);
        return res.data;
    },

    getDemandeEnAttente: async (page = 1, limit = 3) => {
        const res = await axiosInstance.get(`/demande/demandesEnAttente?page=${page}&limit=${limit}`);
        return res.data;
    },

    approuver: async (id) => {
        const res = await axiosInstance.put(`/demande/${id}/approuver`);
        return res.data;
    },

    refuser: async (id) => {
        const res = await axiosInstance.put(`/demande/${id}/refuser`);
        return res.data;
    },

    update: async (id, data) => {
        const res = await axiosInstance.put(`/demande/${id}`, data);
        return res.data;
    },

    delete: async (id) => {
        const res = await axiosInstance.delete(`/demande/${id}/annulerDemande`);
        return res.data;
    }
 };

 export default demandeEmpruntService;