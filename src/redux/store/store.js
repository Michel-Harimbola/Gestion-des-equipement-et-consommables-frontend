import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";

import equipementReducer from "../slices/user/equipementSlice";
import empruntReducer from "../slices/user/empruntSlice";
import enCoursReducer from "../slices/user/EnCoursSlice";
import demandeEmpruntReducer from "../slices/user/demandeEmpruntSlice";
import notificationReducer from "../slices/user/notificationSlice";
import userReducer from "../slices/user/userSlice";

import usersReducer from "../slices/admin/UserSlice";
import empruntsReducer from "../slices/admin/EmpruntSlice";
import demandeEmpruntsReducer from "../slices/admin/DemandeEmpruntSlice";
import equipementsReducer from "../slices/admin/EquipementSlice";
import consommableReducer from "../slices/admin/ConsommableSlice";
import utilisationConsommableReducer from "../slices/admin/utilisationConsommableSlice";
import notificationActifReducer from "../slices/admin/notificationSlice";
import notificationsReducer from "../slices/admin/notificationsSlice";
import dashboardReducer from "../slices/admin/dashboardSlice";
import rapportReducer from "../slices/admin/RapportSlice";

export const store = configureStore({
    reducer: { 
        auth: authReducer,

        user: userReducer,
        equipement: equipementReducer,
        emprunt: empruntReducer,
        enCours: enCoursReducer,
        demande: demandeEmpruntReducer,
        notification: notificationReducer,

        users: usersReducer,
        emprunts: empruntsReducer,
        demandes: demandeEmpruntsReducer,
        equipements: equipementsReducer,
        consommables: consommableReducer,
        utilisation: utilisationConsommableReducer,
        notificationsActif: notificationActifReducer,
        notifications: notificationsReducer,
        dashboard: dashboardReducer,
        rapports: rapportReducer,
    },
});