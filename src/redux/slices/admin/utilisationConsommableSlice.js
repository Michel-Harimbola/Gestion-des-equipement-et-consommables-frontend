import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UtilisationConsommableService from "../../../services/utilisationConsommable.service";


export const fetchUtilisations = createAsyncThunk(
  "utilisationConsommable/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await UtilisationConsommableService.getAllUtilisations();
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createUtilisation = createAsyncThunk(
  "utilisationConsommable/create",
  async (data, { rejectWithValue }) => {
    try {
      return await UtilisationConsommableService.createUtilisation(data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateUtilisation = createAsyncThunk(
  "utilisationConsommable/update",
  async (data, { rejectWithValue }) => {
    try {
      return await UtilisationConsommableService.updateUtilisation(data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteUtilisation = createAsyncThunk(
  "utilisationConsommable/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await UtilisationConsommableService.deleteUtilisation(id);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const utilisationConsommableSlice = createSlice({
  name: "utilisationConsommable",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUtilisations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUtilisations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUtilisations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUtilisation.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteUtilisation.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export default utilisationConsommableSlice.reducer;
