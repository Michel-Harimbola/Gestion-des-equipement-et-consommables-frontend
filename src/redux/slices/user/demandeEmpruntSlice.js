import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateDemandeEmpruntService, userDemandes } from "../../../services/user/demandeEmpruntService";
import toast from "react-hot-toast";

export const createDemandeEmprunt = createAsyncThunk(
  "demande/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await CreateDemandeEmpruntService.create(data);
      toast.success("demande d'emprunt envoyée avec succès !");
      return response;
    } catch (error) {
      toast.error(error.response?.data?.error || "Erreur lors de la création de la demande");
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

const createDemandeEmpruntSlice = createSlice({
  name: "emprunts",
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
      
  },
});

export default createDemandeEmpruntSlice.reducer;