import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, roles }) {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" replace />;

    const decoded = jwtDecode(token);
    if(roles && !roles.includes(decoded.role)) {
        return <Navigate to="/unauthorized" />
    }

    return children;
}