import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UtilisationConsommableService from "../../../services/admin/utilisationConsommableService";
import { toast } from "react-toastify";


export const fetchUtilisations = createAsyncThunk(
  "utilisationConsommable/fetchAll",
  async ({ page = 1, limit = 12 }, thunkAPI) => {
    try {
      return await UtilisationConsommableService.getAllUtilisations(page, limit);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchSearchUtilisation = createAsyncThunk(
    "utilisationConsommable/search",
    async ({ q, page, limit }, { rejectWithValue }) => {
        try {
            return await UtilisationConsommableService.searchUtilisation(q, page, limit);
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const createUtilisation = createAsyncThunk(
  "utilisationConsommable/create",
  async (data, thunkAPI) => {
    try {
      const res = await UtilisationConsommableService.createUtilisation(data);
      toast.success("Utilisation consommable créé avec succès !");
      return res;
    } catch (err) {
      toast.error("Erreur lors de la création");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateUtilisation = createAsyncThunk(
  "utilisationConsommable/update",
  async (data, thunkAPI) => {
    try {
      const res = await UtilisationConsommableService.updateUtilisation(data);
      toast.success("Utilisation consommable mis à jour !");
      return res;
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteUtilisation = createAsyncThunk(
  "utilisationConsommable/delete",
  async (id, thunkAPI) => {
    try {
      const res = await UtilisationConsommableService.deleteUtilisation(id);
      toast.success("Utilisation consommable supprimé !");
      return res;
    } catch (err) {
      toast.error("Erreur lors de la suppression");
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const utilisationConsommableSlice = createSlice({
  name: "utilisation",
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
      .addCase(fetchUtilisations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUtilisations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.UseCons;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchUtilisations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSearchUtilisation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchUtilisation.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.UseCons;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchSearchUtilisation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUtilisation.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteUtilisation.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export const { setPage, setQuery } = utilisationConsommableSlice.actions;
export default utilisationConsommableSlice.reducer;
