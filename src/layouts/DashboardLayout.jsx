import { useState, useEffect } from "react";
import Navbar from "../components/user/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [darkMode, setDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem("darkMode");
      return savedTheme === "true"; 
  });

  const toggleDarkMode = () => {
      setDarkMode((prev) => {
          const newMode = !prev;
          localStorage.setItem("darkMode", newMode); 
          return newMode;
      });
  };
  
  useEffect(() => {
      if (darkMode) {
          document.documentElement.classList.add("dark");
      } else {
          document.documentElement.classList.remove("dark");
      }
  }, [darkMode]);

  return (
    <div className={`h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <Navbar 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode}
      />

      <main className="flex-1 dark:bg-gray-800 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
