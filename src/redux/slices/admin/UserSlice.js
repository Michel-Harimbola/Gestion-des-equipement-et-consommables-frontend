import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../../services/admin/usersService";
import { toast } from "react-toastify";


export const fetchUsers = createAsyncThunk("user/fetchAll", async (_, thunkAPI) => {
  try {
    return await userService.getAll();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement");
  }
});

export const createUser = createAsyncThunk("user/create", async (data, thunkAPI) => {
  try {
    const res = await userService.create(data);
    toast.success("Utilisateur créé avec succès !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la création");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const updateUser = createAsyncThunk("user/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await userService.update(id, data);
    toast.success("Utilisateur mis à jour !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const deleteUser = createAsyncThunk("user/delete", async (id, thunkAPI) => {
  try {
    await userService.remove(id);
    toast.success("Utilisateur supprimé !");
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || "Erreur lors de la suppression");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});


const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
