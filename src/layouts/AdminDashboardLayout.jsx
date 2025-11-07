import { useState } from "react";
import Header from "../components/admin/Header/Header";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


export default function AdminDashboardLayout() {
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }
 
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className={`font-sans transition-colors duration-200 ${darkMode && "dark"}`}>
            <Header 
                toggleDarkMode={toggleDarkMode} 
                darkMode={darkMode}
                toggleSidebar={toggleSidebar}
            />
            <Sidebar isSidebarOpen={isSidebarOpen}/>
            
            <main>
                <Outlet darkMode={darkMode}/>
            </main>
        </div>
    )
};