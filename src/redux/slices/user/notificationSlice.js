import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../../../services/user/notificationService";

export const fetchUserNotifications = createAsyncThunk("notifications/fetchAll", async (_, thunkAPI) => {
    try {
        return await notificationService.getUserNotification();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement");
    }
  }
);

const notificationSlice = createSlice({
name: "notification",
initialState: {
    list: [],
},
reducers: {
    addNotification: (state, action) => {
    state.list.unshift(action.payload);
    },
},
extraReducers: (builder) => {
    builder.addCase(fetchUserNotifications.fulfilled, (state, action) => {
    state.list = action.payload;
    });
},
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
