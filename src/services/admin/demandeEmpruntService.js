import axiosInstance from "../../configs/axios";

const demandeEmpruntService = {
    getAll: async () => {
        const res = await axiosInstance.get("/demande/");
        return res.data;
    },

    approuver: async (id) => {
        const res = await axiosInstance.update(`/demande/${id}/approuver`);
        return res.data;
    },

    refuser: async (id) => {
        const res = await axiosInstance.update(`/demande/${id}/refuser`);
        return res.data;
    }
 };

 export default demandeEmpruntService;