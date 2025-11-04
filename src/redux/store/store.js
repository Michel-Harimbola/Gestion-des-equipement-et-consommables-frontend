import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import equipementReducer from "../slices/user/equipementSlice";
import empruntReducer from "../slices/user/empruntSlice";
import enCoursSlice from "../slices/user/EnCoursSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        equipements: equipementReducer,
        emprunts: empruntReducer,
        enCours: enCoursSlice,
    },
});