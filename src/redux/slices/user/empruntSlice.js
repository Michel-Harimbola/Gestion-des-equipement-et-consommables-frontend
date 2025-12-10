import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { empruntService } from "../../../services/user/empruntService";
import toast from "react-hot-toast";


export const fetchUserEmprunts = createAsyncThunk(
  "emprunts/fetchUserEmprunts", async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await empruntService.getUserEmprunts(page, limit);
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
      .addCase(fetchUserEmprunts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEmprunts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.emprunts;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchUserEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = empruntSlice.actions;
export default empruntSlice.reducer;
