import { useState, useEffect } from "react";
import Header from "../components/admin/Header/Header";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboardLayout() {
    const [darkMode, setDarkMode] = useState(() => {
        // Vérifie si une préférence est déjà enregistrée
        const savedTheme = localStorage.getItem("darkMode");
        return savedTheme === "true"; // renvoie true ou false
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", newMode); // on sauvegarde le choix
            return newMode;
        });
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
        <div className={darkMode ? "dark" : ""}>
            <Header 
                toggleDarkMode={toggleDarkMode} 
                darkMode={darkMode}
                toggleSidebar={toggleSidebar}
            />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            
            <main>
                <Outlet />
            </main>
        </div>
    );
}
