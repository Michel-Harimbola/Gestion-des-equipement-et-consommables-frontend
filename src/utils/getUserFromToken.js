import { jwtDecode } from "jwt-decode";

export default function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email || "", // si besoin
      token
    };
  } catch (error) {
    console.error("Erreur decode token:", error);
    return null;
  }
}