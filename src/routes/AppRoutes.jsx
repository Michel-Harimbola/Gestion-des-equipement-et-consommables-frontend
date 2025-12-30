import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import EmpruntEnCours from "../pages/user/Emprunt_et_Demandes/EmpruntEnCours";
import Equipements from "../pages/user/Equipements";
import MesEmprunts from "../pages/user/MesEmprunts";
import Consommable from "../pages/user/consommable/consommable";
import Profil from "../pages/user/Profil";
import MesUtilisationConsommables from "../pages/user/MesUtilisationConsommables";

import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import Unauthorized from "../pages/Unauthorized";
import Equipement from "../pages/admin/Equipement/Equipement";
import Consommables from "../pages/admin/Consommable/Consommable";
import User from "../pages/admin/User/User";
import Emprunt from "../pages/admin/Emprunt/Emprunt";
import Demande from "../pages/admin/Demandes/Demande";
import UtilisationConsommable from "../pages/admin/UtilisationConsommable/UtilisationConsommable";
import Notification from "../pages/admin/Notification/Notification";
import Rapport from "../pages/admin/Rapport/Rapport";
import Setting from "../pages/admin/Setting";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Routes utilisateur */}
                <Route 
                    element={
                        <ProtectedRoute roles={["personnelInterne", "client", "partenaire"]}>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                  <Route path="/EmpruntEtDemande" element={ <EmpruntEnCours /> } />
                  <Route path="/Equipements" element={ <Equipements /> } />
                  <Route path="/Consommables" element={ <Consommable /> } />
                  <Route path="/MesEmprunts" element={ <MesEmprunts /> } />
                  <Route path="/MesUtilisation" element={ <MesUtilisationConsommables /> } />
                  <Route path="/Profil" element={ <Profil /> } />
                </Route>
                
                {/* Routes admin */}
                 <Route
                  element={
                    <ProtectedRoute roles={["admin", "regisseurEquipementInterne"]}>
                      <AdminDashboardLayout />
                    </ProtectedRoute>
                  }
                >
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/Equipement" element={<Equipement />} />
                    <Route path="/Consommable" element={<Consommables />} />
                    <Route path="/User" element={<User />} />
                    <Route path="/Emprunt" element={<Emprunt />} />
                    <Route path="/Demande" element={<Demande />} />
                    <Route path="/Utilisation" element={<UtilisationConsommable />} />
                    <Route path="/Notification" element={<Notification />} />
                    <Route path="/Rapport" element={<Rapport />} />
                    <Route path="/Setting" element={<Setting />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}