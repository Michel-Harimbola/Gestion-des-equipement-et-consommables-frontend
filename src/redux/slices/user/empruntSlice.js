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

export const searchUserEmprunts= createAsyncThunk(
  "emprunts/search", async ({q, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await empruntService.searchUserEmprunts(q, page, limit);
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
    limit: 10,
    total: 0,
    totalPages: 0,
    query: ""
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    }
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
      })
      .addCase(searchUserEmprunts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUserEmprunts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.emprunts;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(searchUserEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setQuery } = empruntSlice.actions;
export default empruntSlice.reducer;
