import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import UserDashboard from "../pages/user/UserDashboard";
import Equipements from "../pages/user/Equipements";
import MesEmprunts from "../pages/user/MesEmprunts";
import Emprunter from "../pages/user/Emprunter";
import adminDashboard from "../pages/admin/adminDashboard";
import Unauthorized from "../pages/Unauthorized";

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
                      <adminDashboard />
                    </ProtectedRoute>
                  }
                >
                    <Route path="/adminDashboard" element={<adminDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}