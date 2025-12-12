import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../../services/auth/authService.js";
import getUserFromToken from "../../../utils/getUserFromToken.js";
import { toast } from "react-toastify";


export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authService.login(credentials);
      localStorage.setItem("token", res.token);
      toast.success("Connexion réussie !");
      return res;
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur de connexion");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authService.register(data);
      toast.success("Inscription réussie !");
      return res;
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur d'inscription");
      return rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState: { 
      user: getUserFromToken(), 
      loading: false 
    },
    reducers: { 
        logout: (state) => { 
            authService.logout();
            state.user = null; 
            toast.info("Déconnexion réussie !");
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; 
            })
            .addCase(loginUser.rejected, (state) => { state.loading = false; })
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
            .addCase(registerUser.rejected, (state) => { state.loading = false})
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;