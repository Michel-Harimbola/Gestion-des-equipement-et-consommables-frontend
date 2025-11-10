import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateDemandeEmpruntService, userDemandes, annulerDemande as annulerDemandeService } from "../../../services/user/demandeEmpruntService";
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

export const annulerDemande = createAsyncThunk("demande/annulerDemande", async (id, thunkAPI) => {
  try {
    const res = await annulerDemandeService.deleteDemande(id);
    toast.success("Demande annuler !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la confirmation");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

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
      .addCase(annulerDemande.fulfilled, (state, action) => {
      // Retire la demande de la liste une fois refusée
      state.items = state.items.filter(d => d.id !== action.meta.arg);
      })

  },
});

export default createDemandeEmpruntSlice.reducer;