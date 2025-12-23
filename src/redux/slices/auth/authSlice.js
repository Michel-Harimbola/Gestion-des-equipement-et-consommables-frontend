import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../../services/auth/authService.js";
import { toast } from "react-toastify";


export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authService.login(credentials);
      localStorage.setItem("token", res.token);
      localStorage.setItem("currentUser", JSON.stringify(res));
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

const savedUser = localStorage.getItem("currentUser");
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    currentUser: parsedUser,
    loading: false 
  },
  reducers: { 
    logout: (state) => { 
      localStorage.removeItem("token");
      state.user = null; 
      toast.info("Déconnexion réussie !");
    }, 

    updateCurrentUser: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload; 
      })
      .addCase(loginUser.rejected, (state) => { state.loading = false; })
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
      .addCase(registerUser.rejected, (state) => { state.loading = false})
  },
});

export const { logout, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;