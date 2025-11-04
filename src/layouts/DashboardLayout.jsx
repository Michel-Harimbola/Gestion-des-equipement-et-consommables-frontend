import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar fixe en haut */}
      <Navbar />

      {/* Contenu principal sans scroll */}
      <main className="flex-1 bg-gray-100 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
