import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";

import equipementReducer from "../slices/user/equipementSlice";
import empruntReducer from "../slices/user/empruntSlice";
import enCoursReducer from "../slices/user/EnCoursSlice";
import demandeEmpruntReducer from "../slices/user/demandeEmpruntSlice";

import userReducer from "../slices/admin/UserSlice";
import empruntsReducer from "../slices/admin/EmpruntSlice";
import demandeEmpruntsReducer from "../slices/admin/DemandeEmpruntSlice";
import equipementsReducer from "../slices/admin/EquipementSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,

        equipement: equipementReducer,
        emprunt: empruntReducer,
        enCours: enCoursReducer,
        demande: demandeEmpruntReducer,

        users: userReducer,
        emprunts: empruntsReducer,
        demandes: demandeEmpruntsReducer,
        equipements: equipementsReducer,

    },
});