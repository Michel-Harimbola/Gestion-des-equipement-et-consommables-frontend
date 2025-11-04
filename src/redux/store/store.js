import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import equipementReducer from "../slices/user/equipementSlice";
import empruntReducer from "../slices/user/empruntSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        equipements: equipementReducer,
        empruts: empruntReducer,
    },
});