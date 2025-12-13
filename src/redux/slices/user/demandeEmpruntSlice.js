import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  CreateDemandeEmpruntService, 
  CreateDemandeRetourService, userDemandes, 
  annulerDemande as annulerDemandeService
 } from "../../../services/user/demandeEmpruntService";
import { fetchEnCours } from "../user/EnCoursSlice";
import { fetchEquipements } from"./equipementSlice";
import { toast } from "react-toastify";

export const createDemandeEmprunt = createAsyncThunk(
  "demande/emprunt",
  async (data, { dispatch, rejectWithValue, getState }) => {
    let response;
    try {
      response = await CreateDemandeEmpruntService.create(data);
      toast.success("demande d'emprunt envoyée avec succès !");
    } catch (error) {
      toast.error(error.response?.data?.error || "Erreur lors de la création de la demande d'emprunt");
      return rejectWithValue(error.response?.data || error.message);
    }

    try {
      const { page, limit } = getState().equipement;
      dispatch(fetchEquipements({ page, limit }));
    } catch (error) {
      console.warn(" Refresh équipements échoué", error);
    }

    return response;
  }
);

export const CreateDemandeRetour = createAsyncThunk(
  "demande/retour",
  async (data, { rejectWithValue }) => {
    try {
      const response = await CreateDemandeRetourService.createRetour(data);
      toast.success("demande de retour envoyée avec succès !");
      return response;
    } catch (error) {
      toast.error(error.response?.data?.error || "Erreur lors de la création de la demande de retour");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserDemandes = createAsyncThunk(
  "Demandes/fetchDemandes",
  async (_, { rejectWithValue }) => {
    try {
      const data = await userDemandes.getUserDemandes();
      return data;
    } catch (error) {
      toast.error("Erreur lors du chargement des demandes");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const annulerDemande = createAsyncThunk("demande/annulerDemande", async (id, { dispatch, rejectWithValue }) => {
  try {
    const res = await annulerDemandeService.deleteDemande(id);
    toast.success("Demande annuler !");
    dispatch(fetchEnCours());
    dispatch(fetchUserDemandes());
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la confirmation");
    return rejectWithValue(error.response?.data);
  }
});

const createDemandeEmpruntSlice = createSlice({
  name: "demande",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDemandes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDemandes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserDemandes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDemandeEmprunt.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(annulerDemande.fulfilled, (state, action) => {
      state.items = state.items.filter(d => d.id !== action.meta.arg);
      })

  },
});

export default createDemandeEmpruntSlice.reducer;