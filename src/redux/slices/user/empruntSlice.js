import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { empruntService } from "../../../services/empruntService";
import toast from "react-hot-toast";


export const fetchUserEmprunts = createAsyncThunk(
  "emprunts/fetchUserEmprunts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await empruntService.getUserEmprunts();
      return data;
    } catch (error) {
      toast.error("Erreur lors du chargement des emprunts");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const empruntSlice = createSlice({
  name: "emprunts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEmprunts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEmprunts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default empruntSlice.reducer;
