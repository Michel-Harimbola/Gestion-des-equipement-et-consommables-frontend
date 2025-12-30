import { useState, useEffect } from "react";
import Header from "../components/admin/Header/Header";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboardLayout() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("darkMode");
        return savedTheme === "true"; 
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", newMode);
            return newMode;
        });
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className={`flex flex-col h-screen ${darkMode ? "dark" : ""}`}>
            <Header 
                toggleDarkMode={toggleDarkMode} 
                darkMode={darkMode}
                toggleSidebar={toggleSidebar}
            />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                
                <main className="flex-1 dark:bg-gray-900 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
