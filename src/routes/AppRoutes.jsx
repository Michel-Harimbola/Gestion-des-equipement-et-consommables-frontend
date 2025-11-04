import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProctectedRoute from "../components/shared/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import UserDashboard from "../pages/user/UserDashboard";
import Equipements from "../pages/user/Equipements";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProctectedRoute><DashboardLayout /></ProctectedRoute>}>
                  <Route path="/userDashboard" element={ <UserDashboard /> } />
                  <Route path="/userDashboard/Equipements" element={ <Equipements /> } />
                  <Route path="/dashboard/settings" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}