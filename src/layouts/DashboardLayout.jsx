import { useState, useEffect } from "react";
import Navbar from "../components/user/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [darkMode, setDarkMode] = useState(() => {
      // Vérifie si une préférence est déjà enregistrée
      const savedTheme = localStorage.getItem("darkMode");
      return savedTheme === "true"; // renvoie true ou false
  });

  const toggleDarkMode = () => {
      setDarkMode((prev) => {
          const newMode = !prev;
          localStorage.setItem("darkMode", newMode); // on sauvegarde le choix
          return newMode;
      });
  };
  // Optionnel : applique la classe dark au <html> ou <body> directement
  useEffect(() => {
      if (darkMode) {
          document.documentElement.classList.add("dark");
      } else {
          document.documentElement.classList.remove("dark");
      }
  }, [darkMode]);

  return (
    <div className={`h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      {/* Navbar fixe en haut */}
      <Navbar 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode}
      />

      {/* Contenu principal sans scroll */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
