import Navbar from "../components/user/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar fixe en haut */}
      <Navbar />

      {/* Contenu principal sans scroll */}
      <main className="flex-1 bg-gray-50 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
