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
        unreadCount: 0,
    },
    reducers: {
        addNotification: (state, action) => {
            state.list.unshift(action.payload);
            state.unreadCount += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserNotifications.fulfilled, (state, action) => {
                const notifications = Array.isArray(action.payload)
                ? action.payload
                : action.payload.notifications || [];

                state.list = notifications;
                state.unreadCount = notifications.filter(n => !n.vu).length;
            })
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.list = state.list.map(n => ({ ...n, vu: true }));
                state.unreadCount = 0;
            });
    }
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
