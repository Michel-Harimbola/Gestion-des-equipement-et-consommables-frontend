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

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ id, oldPassword, newPassword }, thunkAPI) => {
    try {
      const res = await authService.changePassword(id, {oldPassword, newPassword});
      toast.success("Mot de passe modifié avec succès");
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur");
    }
  }
);

const savedUser = localStorage.getItem("currentUser");
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    currentUser: parsedUser,
    loading: false,
    error: null,
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
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => { state.loading = false; })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;