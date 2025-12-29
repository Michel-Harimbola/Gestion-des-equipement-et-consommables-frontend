import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../../../services/admin/notificationService";
import { toast } from "react-toastify";

export const fetchNotfications = createAsyncThunk("notifications/fetchAll", async ({ page = 1, limit = 11 }, thunkAPI) => {
  try {
    return await notificationService.ReadAll(page, limit);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const deleteNotfication = createAsyncThunk("notifications/delete", async (id, thunkAPI) => {
  try {
    await notificationService.remove(id);
    toast.success("Notification supprimé !");
    return id;
  } catch (error) {
    toast.error("Erreur lors de la suppression");
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

const notificationSlice = createSlice({
name: "notifications",
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
    .addCase(fetchNotfications.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchNotfications.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.notifications || [];
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.page = action.payload.page;
      state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
    })
    .addCase(fetchNotfications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteNotfication.fulfilled, (state, action) => {
      state.items = state.items.filter((u) => u.id !== action.payload);
    });
  },
});

export const { setPage } = notificationSlice.actions;
export default notificationSlice.reducer;