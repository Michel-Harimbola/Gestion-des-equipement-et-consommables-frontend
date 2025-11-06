import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";
import equipementReducer from "../slices/user/equipementSlice";
import empruntReducer from "../slices/user/empruntSlice";
import enCoursReducer from "../slices/user/EnCoursSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        equipements: equipementReducer,
        emprunts: empruntReducer,
        enCours: enCoursReducer,
    },
});