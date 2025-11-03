import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk("auth/login", async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
});

export const registerUser = createAsyncThunk("auth/register", async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
});


const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null, loading: false },
    reducers: { logout: (state) => { state.user = null; state.token = null; localStorage.removeItem("token"); } },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state) => { state.loading = false; })
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
            .addCase(registerUser.rejected, (state) => { state.loading = false})
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;