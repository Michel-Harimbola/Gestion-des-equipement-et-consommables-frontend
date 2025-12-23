import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../../services/user/userService";


export const updatePersonalInformation = createAsyncThunk(
    "user/update",
    async ({id, data}, thunkAPI) => {
        try {
            return await userService.update(id, data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        items: [], 
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updatePersonalInformation.pending, (state) => {
            state.loading = true;
        })
        .addCase(updatePersonalInformation.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.items.findIndex(u => u.id === action.payload.id);
            if (index !== -1) {
            state.items[index] = action.payload;
            }
        })
        .addCase(updatePersonalInformation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default userSlice.reducer;
