import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import demandeEmpruntService from "../../../services/admin/demandeEmpruntService";
import { toast } from "react-toastify";


export const fetchDemandes = createAsyncThunk("demande/fetchAll", async ({ page = 1, limit = 10 }, thunkAPI) => {
  try {
    return await demandeEmpruntService.getAll(page, limit);
  } catch (error) {
    return thunkAPI.rejectWithValue("Erreur lors du chargement");
  }
});

export const createDemande = createAsyncThunk("demande/emprunt", async (data, thunkAPI) => {
  try {
    const res = await demandeEmpruntService.create(data);
    toast.success("Demande mis à jour !");
    return res;
  } catch (error) {
    toast.error("Erreur lors de la création");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const approuverEmprunt = createAsyncThunk("demande/approuver", async (id, thunkAPI) => {
  try {
    const res = await demandeEmpruntService.approuver(id);
    toast.success("Demande approuver !");
    return res;
  } catch (error) {
    toast.error("Erreur lors de la confirmation");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const refuserEmprunt = createAsyncThunk("demande/refuser", async (id, thunkAPI) => {
  try {
    const res = await demandeEmpruntService.refuser(id);
    toast.success("Demande refuser !");
    return res;
  } catch (error) {
    toast.error("Erreur lors de la refus");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const updateDemande = createAsyncThunk("demande/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await demandeEmpruntService.update(id, data);
    toast.success("Demande mis à jour !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const deleteDemande = createAsyncThunk("demande/delete", async (id, thunkAPI) => {
  try {
    const res = await demandeEmpruntService.delete(id);
    toast.success("Demande supprimer !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

const demandeEmpruntSlice = createSlice({
  name: "demande",
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemandes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDemandes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.demandes;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchDemandes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDemande.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(approuverEmprunt.fulfilled, (state, action) => {
      // Retire la demande de la liste une fois approuvée
          state.items = state.items.filter(d => d.id !== action.meta.arg);
      })
      .addCase(refuserEmprunt.fulfilled, (state, action) => {
          // Retire la demande de la liste une fois refusée
          state.items = state.items.filter(d => d.id !== action.meta.arg);
      })
      .addCase(updateDemande.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteDemande.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setPage } = demandeEmpruntSlice.actions;
export default demandeEmpruntSlice.reducer;
