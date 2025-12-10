import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ConsommableSevice from "../../../services/admin/consommableService";
import { toast } from "react-toastify";


export const fetchConsommables = createAsyncThunk("consommable/fetchAll", async ({ page = 1, limit = 12 }, thunkAPI) => {
  try {
    return await ConsommableSevice.getAll(page, limit);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const fetchSearchConsommable = createAsyncThunk(
    "consommable/search",
    async ({ q, page, limit }, { rejectWithValue }) => {
        try {
            return await ConsommableSevice.searchConsommable(q, page, limit);
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const createConsommable = createAsyncThunk("consommable/create", async (data, thunkAPI) => {
  try {
    const res = await ConsommableSevice.create(data);
    toast.success("Consommable créé avec succès !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const updateConsommable = createAsyncThunk("consommable/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await ConsommableSevice.update(id, data);
    toast.success("Consommable mis à jour !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const deleteConsommable = createAsyncThunk("consommable/delete", async (id, thunkAPI) => {
  try {
    await ConsommableSevice.remove(id);
    toast.success("Consommable supprimé !");
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});


const consommableSlice = createSlice({
  name: "consommables",
  initialState: {
    items: [],
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
      .addCase(fetchConsommables.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConsommables.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.consommables;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchConsommables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchConsommable.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(fetchSearchConsommable.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload.consommables;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchSearchConsommable.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(createConsommable.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateConsommable.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteConsommable.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setPage, setQuery } = consommableSlice.actions;
export default consommableSlice.reducer;
