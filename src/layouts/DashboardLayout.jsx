// src/layouts/DashboardLayout.jsx
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Navbar fixe en haut */}
      <Navbar />

      {/* Contenu principal sans scroll */}
      <main className="flex-1 p-6 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
