import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserDashboard from "../pages/user/UserDashboard";
import ProctectedRoute from "../components/shared/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProctectedRoute><DashboardLayout /></ProctectedRoute>}>
                  <Route path="/userDashboard" element={ <UserDashboard /> } />
                  <Route path="/dashboard/profile" />
                  <Route path="/dashboard/settings" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}