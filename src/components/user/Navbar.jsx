import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/auth/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import socket from "../../configs/socket";
import { fetchUserNotifications, addNotification, markAllNotificationsAsRead } from "../../redux/slices/user/notificationSlice";
import { navItems } from "../../constants/index";
import { X, Menu, Bell } from 'lucide-react';
import { FaSun, FaMoon } from "react-icons/fa";
import YouthComputing from "../../assets/YouthComputing.svg";


export default function Navbar({ darkMode, toggleDarkMode }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isActive, setIsActive] = useState(0);
    const [isOpen, setIsOpen] = useState(false)
    const [showNotif, setShowNotif] = useState(false);

    const {list: notifications, hasUnread} = useSelector(state => state.notification);
    const { role } = useSelector(state => state.auth.currentUser);
    
    const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    }

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
            dispatch(fetchUserNotifications());
            socket.on("notif_retard", (notification) => {
                dispatch(addNotification(notification));
            });

            socket.on("notif_demande", (notification) => {
                dispatch(addNotification(notification));
            });
    
            return () => {
                socket.off("notif_retard");
                socket.off("notif_demande");
            }
        }, [dispatch]);

    return (
        <div
            id="navbar"
            className="w-full h-16 backdrop-blur-sm border-b border-neutral-200 flex items-center justify-between dark:text-white dark:border-gray-600
            md:px-16 sm:px-10 px-4 fixed top-0 transition-all ease-in-out duration-300 z-50 bg-transparent dark:bg-gray-800 shadow-md" 
        >
            {/* Logo */}
            <div className="flex items-center gap-2 md:pr-16 pr-0">
                <Link to="/UserDashboard" className="text-2xl text-marine dark:text-fuchsia font-semibold flex items-center gap-x-2">
                    <img src={YouthComputing} alt="Logo" className="h-8 w-8 bg-fuchsia dark:bg-marine rounded-full" />
                    YouthBorrow
                </Link>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden flex gap-4">
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowNotif(!showNotif);

                            if (!showNotif) {
                                dispatch(markAllNotificationsAsRead());
                            }
                        }}
                        className="w-fit p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative cursor-pointer"
                    >
                        <Bell size={24} />
                        {hasUnread && (
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
                        )}
                    </button>

                    {showNotif && (
                        <Notification
                            onClose={() => {
                                setShowNotif(false);
                                dispatch(markAllNotificationsAsRead());
                            }}
                            notifications={notifications}
                        />
                    )}
                </div>

                <button
                    onClick={toggleNavbar}
                    className="text-neutral-600 dark:text-white focus:outline-none cursor-pointer"
                >
                    <Menu size={24} color="currentColor" />
                </button>
            </div>

            {/* Navbar items and buttons */}
            <div 
                className={`fixed md:static top-0 right-0 h-screen md:h-auto w-full md:w-auto bg-sky-50 dark:bg-gray-800 dark:border-gray-600 border-l 
                    md:border-none border-neutral-300 md:bg-transparent shadow-lg md:shadow-none transition-transform 
                    duration-300 ease-in-out transform flex-1 ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 z-60`}
            >

                {/* Logo and close icon Inside Toggle Menu */}
                <div className="w-full md:hidden flex items-center justify-between px-4">
                    <Link to="/UserDashboard" className="text-2xl text-marine dark:text-fuchsia font-semibold flex items-center gap-x-2">
                        <img src={YouthComputing} alt="Logo" className="h-8 w-8 bg-fuchsia dark:bg-marine rounded-full" />
                        YouthBorrow
                    </Link>
                    <div className="md:hidden flex justify-end py-6">
                        <button
                            onClick={toggleNavbar}
                            className="text-red-600 dark:text-red-500 focus:outline-none cursor-pointer"
                        >
                            <X size={24} color="currentColor" />
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-b border-neutral-300 dark:border-gray-700 md:hidden"></div>

                <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-0">
                    {/* Navbar items */}
                    <ul className="flex flex-col md:flex-row items-center gap-5 text-lg font-semibold cursor-pointer">
                        {navItems
                            .filter(item => item.roles.includes(role))
                            .map((item) => (
                                <li key={item.id}>
                                    <Link 
                                        to={item.path} 
                                        onClick={() => {
                                            setIsActive(item.id);
                                            setIsOpen(false);                                
                                        }}
                                        className={`ease-in-out border-fuchsia ${isActive == item.id ? "text-fuchsia hover:text-red-600  lg:border-b-4 pb-5" : "hover:text-fuchsia"}`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <button 
                            onClick={toggleDarkMode}
                            className="hover:bg-gray-200 dark:bg-slate-50 dark:text-slate-700 rounded-full p-2 -mr-2 cursor-pointer" 
                        >
                            {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                        </button>
                        
                        <div className="relative hidden md:block">
                            <button
                                onClick={() => {
                                    setShowNotif(!showNotif);

                                    if (!showNotif) {
                                        dispatch(markAllNotificationsAsRead());
                                    }
                                }}
                                className="w-fit p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative cursor-pointer"
                            >
                                <Bell size={24} />
                                {hasUnread && (
                                  <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
                                )}
                            </button>

                            {showNotif && (
                                <Notification
                                    onClose={() => {
                                        setShowNotif(false);
                                        dispatch(markAllNotificationsAsRead());
                                    }}
                                    notifications={notifications}
                                />
                            )}
                        </div>

                        <button 
                            onClick={handleLogout}
                            className="w-fit px-6 py-2 rounded-lg text-base text-neutral-50 bg-red-500 hover:bg-red-400 
                                transition-colors duration-200 cursor-pointer">
                            Déconnecter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
