import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { equipementService } from "../../../services/user/equipementsService";
import toast from "react-hot-toast";

export const fetchEquipements = createAsyncThunk(
  "equipements/fetchAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
        const data = await equipementService.getAll(page, limit);
        return data;
    } catch (error) {
        toast.error("Erreur lors du chargement des équipements");
        return rejectWithValue(error.response?.data || error.message);
    }
  }  
);

const equipementSlice = createSlice({
    name: "equipements",
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
            .addCase(fetchEquipements.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEquipements.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.equipements;
                state.total = action.payload.total;
                state.limit = action.payload.limit;
                state.page = action.payload.page;
                state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
            })
            .addCase(fetchEquipements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage } = equipementSlice.actions;
export default equipementSlice.reducer;