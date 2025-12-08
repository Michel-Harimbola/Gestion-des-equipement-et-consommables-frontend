import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ConsommableSevice from "../../../services/admin/consommableService";
import { toast } from "react-toastify";


export const fetchConsommables = createAsyncThunk("consommable/fetchAll", async (_, thunkAPI) => {
  try {
    return await ConsommableSevice.getAll();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsommables.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConsommables.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchConsommables.rejected, (state, action) => {
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

export default consommableSlice.reducer;
