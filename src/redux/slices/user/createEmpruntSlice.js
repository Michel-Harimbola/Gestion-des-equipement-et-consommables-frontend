import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateEmpruntService } from "../../../services/user/empruntService";
import toast from "react-hot-toast";

export const createEmprunt = createAsyncThunk(
  "emprunt/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await CreateEmpruntService.create(data);
      toast.success("Emprunt créé avec succès !");
      return response;
    } catch (error) {
      toast.error(error.response?.data?.error || "Erreur lors de la création de l’emprunt");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const createEmpruntSlice = createSlice({
  name: "emprunts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmprunt.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmprunt.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createEmprunt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createEmpruntSlice.reducer;