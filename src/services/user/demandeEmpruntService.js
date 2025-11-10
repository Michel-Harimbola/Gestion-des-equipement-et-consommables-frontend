import axiosInstance from "../../configs/axios";

export const CreateDemandeEmpruntService = {
  async create(empruntData) {
    const response = await axiosInstance.post("/demande/create", empruntData);
    return response.data;
  },
};

export const userDemandes = {
  async getUserDemandes() {
    const response = await axiosInstance.get("/demande/userDemandes");
    return response.data;
  }
}

export const annulerDemande = {
  async deleteDemande(id) {
    const response = await axiosInstance.delete(`/demande/${id}/annulerDemande`);
    return response.data;
  }
}