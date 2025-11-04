import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import equipementReducer from "../slices/user/equipementSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        equipements: equipementReducer,
    },
});