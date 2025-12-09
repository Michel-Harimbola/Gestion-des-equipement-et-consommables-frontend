import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DashboardService from "../../../services/admin/dashboardService.js";


export const fetchStats = createAsyncThunk("consommable/fetchAll", async (_, thunkAPI) => {
  try {
    return await DashboardService.getStats();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const fetchEmpruntsParMois = createAsyncThunk("consommable/fetchEmpruntsParMois", async (_, thunkAPI) => {
  try {
    return await DashboardService.getEmpruntsParMois();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const fetchEquipementsStatus = createAsyncThunk("dashboard/fetchEquipementsStatus", async (_, thunkAPI) => {
  try {
    return await DashboardService.getEquipementsStatus();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

const adminStatsSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalUsers: 0,
    empruntsEnCours: 0,
    consommablesCritiques: 0,
    loadingStats: false,
    errorStats: null,

    months: [],
    emprunts: [],
    loadingEmprunts: false,
    errorEmprunts: null,

    equipementsStatus: {
      disponibles: 0,
      empruntes: 0,
      maintenance: 0
    },
    loadingEquipements: false,
    errorEquipements: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchStats.pending, (state) => {
          state.loadingStats = true;
          state.errorStats = null;
        })
        .addCase(fetchStats.fulfilled, (state, action) => {
          state.loadingStats = false;
          state.totalUsers = action.payload.totalUsers;
          state.empruntsEnCours = action.payload.empruntsEnCours;
          state.consommablesCritiques = action.payload.consommablesCritiques;
        })
        .addCase(fetchStats.rejected, (state, action) => {
          state.loadingStats = false;
          state.errorStats = action.payload;
        })
        .addCase(fetchEmpruntsParMois.pending, (state) => {
        state.loadingEmprunts = true;
        })
        .addCase(fetchEmpruntsParMois.fulfilled, (state, action) => {
          state.loadingEmprunts = false;
          state.months = action.payload.months;
          state.emprunts = action.payload.emprunts;
        })
        .addCase(fetchEmpruntsParMois.rejected, (state, action) => {
          state.loadingEmprunts = false;
          state.errorEmprunts = action.payload;
        })
        .addCase(fetchEquipementsStatus.pending, (state) => {
          state.loadingEquipements = true;
        })
        .addCase(fetchEquipementsStatus.fulfilled, (state, action) => {
          state.loadingEquipements = false;
          state.equipementsStatus = action.payload;
        })
        .addCase(fetchEquipementsStatus.rejected, (state, action) => {
          state.loadingEquipements = false;
          state.errorEquipements = action.payload;
        });
  },
});

export default adminStatsSlice.reducer;