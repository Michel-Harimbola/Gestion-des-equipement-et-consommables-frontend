import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../../../services/admin/notificationService";

export const fetchNotificationsActif = createAsyncThunk("notifications/fetchAllActif", async (_, thunkAPI) => {
    try {
        return await notificationService.getAllActif();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement");
    }
  }
);

const notificationSlice = createSlice({
name: "notificationsActif",
initialState: {
    list: [],
},
reducers: {
    addNotification: (state, action) => {
    state.list.unshift(action.payload);
    },
},
extraReducers: (builder) => {
    builder.addCase(fetchNotificationsActif.fulfilled, (state, action) => {
    state.list = action.payload;
    });
},
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
