import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import demandeEmpruntService from "../../../services/admin/demandeEmpruntService";
import { toast } from "react-toastify";


export const fetchEmprunts = createAsyncThunk("demande/fetchAll", async (_, thunkAPI) => {
  try {
    return await demandeEmpruntService.getAll();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement");
  }
});

export const approuverEmprunt = createAsyncThunk("demande/approuver", async (id, thunkAPI) => {
  try {
    const res = await demandeEmpruntService.approuver(id);
    toast.success("Demande approuver !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la confirmation");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const refuserEmprunt = createAsyncThunk("demande/refuser", async (id, thunkAPI) => {
  try {
    const res = await demandeEmpruntService.refuser(id);
    toast.success("Demande refuser !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la confirmation");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});


const demandeEmpruntSlice = createSlice({
  name: "demande",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmprunts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmprunts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approuverEmprunt.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(refuserEmprunt.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
  },
});

export default demandeEmpruntSlice.reducer;
