import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../../services/admin/usersService";
import { toast } from "react-toastify";


export const fetchUsers = createAsyncThunk("user/fetchAll", async ({ page = 1, limit = 11 }, thunkAPI) => {
  try {
    return await userService.getAll(page, limit);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const getUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const res = await userService.getById();
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const fetchSearchUser = createAsyncThunk(
    "user/search",
    async ({ q, page, limit }, { rejectWithValue }) => {
        try {
            return await userService.searchUser(q, page, limit);
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const createUser = createAsyncThunk("user/create", async (data, thunkAPI) => {
  try {
    const res = await userService.create(data);
    toast.success("Utilisateur créé avec succès !");
    return res;
  } catch (error) {
    toast.error("Erreur lors de la création");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const updateUser = createAsyncThunk("user/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await userService.update(id, data);
    toast.success("Utilisateur mis à jour !");
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const deleteUser = createAsyncThunk("user/delete", async (id, thunkAPI) => {
  try {
    await userService.remove(id);
    toast.success("Utilisateur supprimé !");
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

const savedUser = localStorage.getItem("currentUser");

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    currentUser: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null,
    page: 1,
    limit: 11,
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
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.users;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.users;
        state.total = action.payload.total;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      })
      .addCase(fetchSearchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
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

export const { setPage, setQuery } = userSlice.actions;
export default userSlice.reducer;
