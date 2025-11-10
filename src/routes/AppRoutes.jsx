import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import UserDashboard from "../pages/user/Accueil/UserDashboard";
import Equipements from "../pages/user/Equipements";
import MesEmprunts from "../pages/user/MesEmprunts";
import Emprunter from "../pages/user/Emprunter";
import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import Unauthorized from "../pages/Unauthorized";
import Equipement from "../pages/admin/Equipement/Equipement";
import Consommable from "../pages/admin/Consommable/Consommable";
import User from "../pages/admin/User/User";
import Emprunt from "../pages/admin/Emprunt/Emprunt";

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
                        <ProtectedRoute roles={["utilisateurSimple"]}>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                  <Route path="/userDashboard" element={ <UserDashboard /> } />
                  <Route path="/userDashboard/Equipements" element={ <Equipements /> } />
                  <Route path="/userDashboard/MesEmprunts" element={ <MesEmprunts /> } />
                  <Route path="/userDashboard/Emprunter" element={ <Emprunter /> } />
                </Route>
                
                {/* Routes admin */}
                 <Route
                  element={
                    <ProtectedRoute roles={["admin", "responsableRH"]}>
                      <AdminDashboardLayout />
                    </ProtectedRoute>
                  }
                >
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/Equipement" element={<Equipement />} />
                    <Route path="/Consommable" element={<Consommable />} />
                    <Route path="/User" element={<User />} />
                    <Route path="/Emprunt" element={<Emprunt />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}