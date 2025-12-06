import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import empruntService from "../../../services/admin/empruntService";
import { toast } from "react-toastify";


export const fetchEmprunts = createAsyncThunk("emprunt/fetchAll", async (_, thunkAPI) => {
  try {
    return await empruntService.getAll();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const fetchRecent = createAsyncThunk("emprunt/recent", async (_, thunkAPI) => {
  try {
    return await empruntService.getRecent();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

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
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmprunts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmprunts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
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

export default empruntSlice.reducer;
