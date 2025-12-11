import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rapportService from "../../../services/admin/rapportService";
import { toast } from "react-toastify";


export const fetchRapports = createAsyncThunk("rapport/fetchAll", async ({ page = 1, limit = 12 }, thunkAPI) => {
  try {
    return await rapportService.getAll(page, limit);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const deleteRapport = createAsyncThunk("rapport/delete", async (id, thunkAPI) => {
  try {
    await rapportService.remove(id);
    toast.success("Rapport supprimé !");
    return id;
  } catch (error) {
    toast.error("Erreur lors de la suppression");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});


const rapportSlice = createSlice({
  name: "rapports",
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
      .addCase(fetchRapports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRapports.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.rapports;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchRapports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRapport.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setPage } = rapportSlice.actions;
export default rapportSlice.reducer;
