import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../../../services/user/notificationService";


export const fetchUserNotifications = createAsyncThunk(
    "notifications/fetchAll",
    async (_, thunkAPI) => {
        try {
            return await notificationService.getUserNotification();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement");
        }
    }
);

export const markAllNotificationsAsRead = createAsyncThunk(
    "notifications/markAllRead",
    async (_, thunkAPI) => {
        try {
            await notificationService.markAllAsRead();
            return true;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        list: [],
        hasUnread: false, 
    },
    reducers: {
        addNotification: (state, action) => {
            state.list.unshift(action.payload);
            state.hasUnread = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserNotifications.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.list = state.list.map(n => ({ ...n, vu: true }));
                state.hasUnread = false;
            });
    }
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
