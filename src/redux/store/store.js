import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";

import equipementReducer from "../slices/user/equipementSlice";
import empruntReducer from "../slices/user/empruntSlice";
import enCoursReducer from "../slices/user/EnCoursSlice";
import demandeEmpruntReducer from "../slices/user/demandeEmpruntSlice";
import notificationReducer from "../slices/user/notificationSlice";

import userReducer from "../slices/admin/UserSlice";
import empruntsReducer from "../slices/admin/EmpruntSlice";
import demandeEmpruntsReducer from "../slices/admin/DemandeEmpruntSlice";
import equipementsReducer from "../slices/admin/EquipementSlice";
import consommableReducer from "../slices/admin/ConsommableSlice";
import utilisationConsommableReducer from "../slices/admin/utilisationConsommableSlice";
import notificationsReducer from "../slices/admin/notificationSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,

        equipement: equipementReducer,
        emprunt: empruntReducer,
        enCours: enCoursReducer,
        demande: demandeEmpruntReducer,
        notification: notificationReducer,

        users: userReducer,
        emprunts: empruntsReducer,
        demandes: demandeEmpruntsReducer,
        equipements: equipementsReducer,
        consommables: consommableReducer,
        utilisation: utilisationConsommableReducer,
        notifications: notificationsReducer,
    },
});