import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EnCoursService } from "../../../services/user/empruntService";
import toast from "react-hot-toast";


export const fetchEnCours = createAsyncThunk(
  "enCours/fetchEnCours",
  async (_, { rejectWithValue }) => {
    try {
      const data = await EnCoursService.getUserEmpruntsInProgress();
      return data;
    } catch (error) {
      toast.error("Erreur lors du chargement des emprunts en cours");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const enCoursSlice = createSlice({
  name: "enCours",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnCours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnCours.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEnCours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default enCoursSlice.reducer;
