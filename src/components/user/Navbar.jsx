import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/auth/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import Setting from "./Setting";
import Historique from "./Historique";
import socket from "../../configs/socket";
import { fetchUserNotifications, addNotification, markAllNotificationsAsRead } from "../../redux/slices/user/notificationSlice";
import { navItems } from "../../constants/index";
import { useTranslation } from "react-i18next";
import { X, Menu, Bell } from 'lucide-react';
import { FiChevronDown } from "react-icons/fi";
import YouthComputing from "../../assets/YouthComputing.png";


export default function Navbar({ darkMode, toggleDarkMode }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifRef = useRef(null);
    const settingRef = useRef(null);
    
    const [isActive, setIsActive] = useState(1);
    const [isOpen, setIsOpen] = useState(false)
    const [showNotif, setShowNotif] = useState(false);
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const [isHistoriqueOpen, setIsHistoriqueOpen] = useState(false);

    const { list: notifications, unreadCount } = useSelector(state => state.notification);
    const { role, photo, nom, prenom } = useSelector(state => state.auth.currentUser);

    const { t } = useTranslation();
    
    const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    }

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSetting = () => {
        setIsOpenSetting(!isOpenSetting);
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
    
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (notifRef.current && !notifRef.current.contains(e.target)) {
          setShowNotif(false);
        }

        if (settingRef.current && !settingRef.current.contains(e.target)) {
          setIsOpenSetting(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            id="navbar"
            className="
                w-full h-16 bg-white border-b border-neutral-200 flex items-center justify-between dark:text-white dark:border-gray-600
                md:px-16 sm:px-10 px-4 fixed top-0 transition-all ease-in-out duration-300 z-50 dark:bg-gray-800 shadow-md
            " 
        >
            {/* Logo */}
            <div className="flex items-center gap-2 md:pr-16 pr-0">
                <Link to="/userDashboard/equipements" className="text-2xl text-marine dark:text-fuchsia font-semibold flex items-center gap-x-2">
                    <img src={YouthComputing} alt="Logo" className="h-10 w-10 rounded-full" />
                    YouthComputing
                </Link>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden flex gap-4">
                <div className="relative">
                    <button
                        onClick={() => setShowNotif(!showNotif)}
                        className="w-fit p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative cursor-pointer"
                    >
                        <Bell size={24} />
                        {unreadCount > 0 && (
                            <span className="
                                absolute -top-1 -right-1 
                                min-w-[20px] h-[20px] 
                                px-1
                                flex items-center justify-center
                                text-xs font-bold text-white
                                bg-red-500 
                                rounded-full
                            ">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
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
                className={`
                    fixed md:static top-0 right-0 h-screen md:h-auto w-full md:w-auto bg-sky-50 dark:bg-gray-800 dark:border-gray-600 border-l 
                    md:border-none border-neutral-300 md:bg-transparent shadow-lg md:shadow-none transition-transform 
                    duration-300 ease-in-out transform flex-1 ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0 z-60
                `}
            >

                {/* Logo and close icon Inside Toggle Menu */}
                <div className="w-full md:hidden flex items-center justify-between px-4">
                    <Link to="/userDashboard/equipements" className="text-2xl text-marine dark:text-fuchsia font-semibold flex items-center gap-x-2">
                        <img src={YouthComputing} alt="Logo" className="h-10 w-10 rounded-full" />
                        YouthComputing
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
                                <li
                                    key={item.id}
                                    onMouseEnter={() => item.name === "history" && setIsHistoriqueOpen(true)}
                                    onMouseLeave={() => item.name === "history" && setIsHistoriqueOpen(false)}
                                    className="relative"
                                >
                                    {item.name === "history" ? (
                                        <span
                                            onClick={() => setIsHistoriqueOpen(true)}
                                            className={`ease-in-out border-fuchsia ${
                                                isActive === item.id
                                                    ? "text-fuchsia hover:text-red-600 lg:border-b-4 pb-5"
                                                    : "hover:text-fuchsia"
                                            }`}
                                        >
                                            {t(item.name)}
                                        </span>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            onClick={() => {
                                                setIsActive(item.id);
                                                setIsOpen(false);
                                            }}
                                            className={`ease-in-out border-fuchsia ${
                                                isActive === item.id
                                                    ? "text-fuchsia hover:text-red-600 lg:border-b-4 pb-5"
                                                    : "hover:text-fuchsia"
                                            }`}
                                        >
                                            {t(item.name)}
                                        </Link>
                                    )}

                                    {/* Historique dropdown */}
                                    {item.name === "history" && isHistoriqueOpen && (
                                        <div className="absolute top-full left-0 z-50">
                                            <Historique
                                                path1={item.path1}
                                                path2={item.path2}
                                                ID={item.id}
                                                setIsActive={setIsActive}
                                            />
                                        </div>
                                    )}
                                </li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div 
                            ref={notifRef} 
                            className="relative hidden md:block"
                        >
                            <button
                                onClick={() => setShowNotif(!showNotif)}
                                className="w-fit p-3 rounded-full bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 relative cursor-pointer"
                            >
                                <Bell size={24} />
                                {unreadCount > 0 && (
                                    <span className="
                                        absolute -top-1 -right-1 
                                        min-w-[20px] h-[20px] 
                                        px-1
                                        flex items-center justify-center
                                        text-xs font-bold text-white
                                        bg-red-500 
                                        rounded-full
                                    ">
                                        {unreadCount > 9 ? "9+" : unreadCount}
                                    </span>
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

                        {/* Setting */}
                        <div 
                            ref={settingRef} 
                            className="relative"
                        >
                            <button 
                                onClick={toggleSetting}
                                className="flex flex-col hover:opacity-80 cursor-pointer"
                            >
                                {photo ? (
                                    <img 
                                        src={`http://localhost:3001${photo}`} 
                                        alt={photo}
                                        className="w-[46px] h-[46px] -mb-4 object-cover rounded-full" 
                                    />
                                ):(
                                    <span>{t("noPhoto")}</span>
                                )}
                                <div className="flex justify-end">
                                    < FiChevronDown className="size-[17px] bg-gray-200 dark:bg-gray-600 rounded-full" />
                                </div>
                            </button>

                            {isOpenSetting && (
                                <Setting 
                                    darkMode={darkMode}
                                    toggleDarkMode={toggleDarkMode}
                                    handleLogout={handleLogout}
                                    photo={photo}
                                    nom={nom}
                                    prenom={prenom}
                                    setIsOpenSetting={setIsOpenSetting}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
