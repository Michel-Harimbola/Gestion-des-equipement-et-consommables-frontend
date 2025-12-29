import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import empruntService from "../../../services/admin/empruntService";
import { toast } from "react-toastify";


export const fetchEmprunts = createAsyncThunk("emprunt/fetchAll", async ({ page = 1, limit }, thunkAPI) => {
  try {
    return await empruntService.getAll(page, limit);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const fetchRecentEmprunts = createAsyncThunk("emprunt/fetchRecent", async (_, thunkAPI) => {
  try {
    return await empruntService.getRecent();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const fetchSearchEmprunt = createAsyncThunk(
    "emprunt/search",
    async ({ q, page, limit }, { rejectWithValue }) => {
        try {
            return await empruntService.searchEmprunt(q, page, limit);
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const createEmprunt = createAsyncThunk("emprunt/create", async (data, thunkAPI) => {
  try {
    const res = await empruntService.create(data);
    toast.success("Emprunt créé avec succès !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const updateEmprunt = createAsyncThunk("emprunt/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await empruntService.update(id, data);
    toast.success("Emprunt mis à jour !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const deleteEmprunt = createAsyncThunk("emprunt/delete", async (id, thunkAPI) => {
  try {
    await empruntService.remove(id);
    toast.success("Emprunt supprimé !");
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

const empruntSlice = createSlice({
  name: "emprunts",
  initialState: {
    items: [],
    recent: [],
    loading: false,
    error: null,
    page: 1,
    limit: 12,
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
      .addCase(fetchEmprunts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmprunts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.emprunts || [];
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecentEmprunts.fulfilled, (state, action) => {
        state.loading = false;
        state.recent = action.payload;
      })
      .addCase(fetchRecentEmprunts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchEmprunt.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchEmprunt.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.emprunts || [];
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchSearchEmprunt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEmprunt.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEmprunt.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteEmprunt.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setPage, setQuery } = empruntSlice.actions;
export default empruntSlice.reducer;
