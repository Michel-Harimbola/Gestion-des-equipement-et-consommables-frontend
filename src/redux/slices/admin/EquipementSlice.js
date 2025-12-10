import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import equipementService from "../../../services/admin/equipementService";
import { toast } from "react-toastify";


export const fetchEquipements = createAsyncThunk("equipement/fetchAll", async ({ page = 1, limit = 12 }, thunkAPI) => {
  try {
    return await equipementService.getAll(page, limit);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement");
  }
});

export const createEquipement = createAsyncThunk("equipement/create", async (data, thunkAPI) => {
  try {
    const res = await equipementService.create(data);
    toast.success("Equipement créé avec succès !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la création");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const updateEquipement = createAsyncThunk("equipement/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await equipementService.update(id, data);
    toast.success("Equipement mis à jour !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const deleteEquipement = createAsyncThunk("equipement/delete", async (id, thunkAPI) => {
  try {
    await equipementService.remove(id);
    toast.success("Equipement supprimé !");
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la suppression");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});


const equipementSlice = createSlice({
  name: "equipements",
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
      .addCase(fetchEquipements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEquipements.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.equipements;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchEquipements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEquipement.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEquipement.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteEquipement.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setPage } = equipementSlice.actions;
export default equipementSlice.reducer;
