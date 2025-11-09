import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";
import equipementReducer from "../slices/user/equipementSlice";
import empruntReducer from "../slices/user/empruntSlice";
import enCoursReducer from "../slices/user/EnCoursSlice";
import userReducer from "../slices/admin/UserSlice";
import empruntsReducer from "../slices/admin/EmpruntSlice";
import demandeEmpruntReducer from "../slices/user/demandeEmpruntSlice";
import demandeEmpruntsReducer from "../slices/admin/DemandeEmpruntSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,
        equipements: equipementReducer,
        emprunts: empruntReducer,
        enCours: enCoursReducer,
        users: userReducer,
        emprunts: empruntsReducer,
        demandes: demandeEmpruntReducer,
        demandes: demandeEmpruntsReducer,
    },
});