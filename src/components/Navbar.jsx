import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X, Menu, Bell } from 'lucide-react';
import YouthComputing from "../assets/YouthComputing.svg";


export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }

  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
        {
            id: 1,
            name: "En cours",
            path: "/UserDashboard",
        },
        {
            id: 2,
            name: "Equipements",
            path: "/Equipement",
        },
        {
            id: 3,
            name: "Emprunts",
            path: "/Emprunts",
        },
        {
            id: 4,
            name: "Emprunter",
            path: "/Emprunter",
        },

    ];

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  return (
        <div
            id="navbar"
            className={`w-full h-[8ch] backdrop-blur-sm border-b border-neutral-200 flex items-center justify-between md:px-16 sm:px-10 px-4 fixed top-0 transition-all ease-in-out duration-300 z-50 ${isScrolled ? "bg-sky-50/30" : "bg-transparent"
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-2 md:pr-16 pr-0">
                <Link to="/UserDashboard" className="text-2xl font-semibold text-sky-700 flex items-center gap-x-2">
                    <img src={YouthComputing} alt="Logo" className="h-8 w-8 bg-blue-500 rounded-full" />
                    YouthBorrow
                </Link>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
                <button
                    onClick={toggleNavbar}
                    className="text-neutral-600 focus:outline-none"
                >
                  <Menu size={24} color="currentColor" />
                </button>
            </div>

            {/* Navbar items and buttons */}
            <div
                className={`fixed md:static top-0 right-0 h-screen md:h-auto w-full md:w-auto bg-sky-50 border-l md:border-none border-neutral-300 md:bg-transparent shadow-lg md:shadow-none transition-transform duration-300 ease-in-out transform flex-1 ${isOpen ? "translate-x-0" : "translate-x-full"
                    } md:translate-x-0 z-60`}
            >

                {/* Logo and close icon Inside Toggle Menu */}
                <div className="w-full md:hidden flex items-center justify-between px-4">
                    {/* Logo */}
                    <Link to="/UserDashboard" className="text-2xl font-semibold text-sky-700 flex items-center gap-x-2">
                        <img src={YouthComputing} alt="Logo" className="h-8 w-8 bg-blue-500 rounded-full" />
                        YouthBorrow
                    </Link>
                    {/* Close Icon */}
                    <div className="md:hidden flex justify-end py-6">
                        <button
                            onClick={toggleNavbar}
                            className="text-red-600 focus:outline-none"
                        >
                            <X size={24} color="currentColor" />
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-b border-neutral-300 md:hidden"></div>

                <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-0">
                    {/* Navbar items */}
                    <ul className="flex flex-col md:flex-row items-center gap-6 text-xl text-neutral-700 font-normal">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Link to={item.path} className="hover:text-sky-600 ease-in-out duration-300">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <button className="w-fit px-6 py-2 rounded-full text-base text-neutral-800 font-medium bg-transparent transition-colors duration-200 cursor-pointer">
                            <Bell size={24} color="currentColor" />
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-fit px-6 py-2 rounded-lg text-base text-neutral-50 bg-red-500 hover:bg-red-400 transition-colors duration-200 cursor-pointer">
                            Déconnecter
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
}
