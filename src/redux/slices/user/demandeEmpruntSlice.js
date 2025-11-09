import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateDemandeEmpruntService } from "../../../services/user/demandeEmpruntService";
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
      .addCase(createDemandeEmprunt.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDemandeEmprunt.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createDemandeEmprunt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createDemandeEmpruntSlice.reducer;