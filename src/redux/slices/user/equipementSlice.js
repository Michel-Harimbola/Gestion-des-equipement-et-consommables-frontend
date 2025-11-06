import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { equipementService } from "../../../services/user/equipementsService";
import toast from "react-hot-toast";

export const fetchEquipements = createAsyncThunk(
  "equipements/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
        const data = await equipementService.getAll();
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
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEquipements.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEquipements.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchEquipements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default equipementSlice.reducer;