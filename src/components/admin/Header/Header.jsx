import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import YouthComputing from "../../../assets/YouthComputing.svg";


export default function Header({ darkMode, toggleDarkMode, toggleSidebar }) {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">

                    <div className="flex items-center justify-start rtl:justify-end">
                        <button 
                            onClick={toggleSidebar}
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none
                                focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <HiOutlineMenuAlt2 className="text-2xl"/>
                        </button>
                        <a href="#" className="flex ms-2 md:me-24 gap-2">
                            <img src={YouthComputing} alt="Logo" className="w-8 h-8 bg-blue-500 rounded-full"/>
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                YouthStock
                            </span>
                        </a>
                    </div>

                    <button 
                        onClick={toggleDarkMode}
                        className="dark:bg-slate-50 dark:text-slate-700 rounded-full p-2" 
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            </div>
        </nav>
    );
};