import { useState } from "react";
import { UserCircle, LogOutIcon, LanguagesIcon, MoonIcon, ArrowLeft } from 'lucide-react';
import { FiChevronRight } from "react-icons/fi";

export default function Setting({ darkMode, toggleDarkMode, handleLogout, photo, nom, prenom }) {
    const [activePage, setActivePage] = useState("main");

    return (
        <div className="absolute flex flex-col gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 w-[300px] right-0 top-14 rounded-xl p-4">
            <div className="flex gap-3 border-b-2 pb-4 border-b-gray-300 dark:border-b-gray-600">
                <div>
                    {photo ? (
                        <img 
                            src={`http://localhost:3000${photo}`} 
                            alt={photo}
                            className="w-14 h-14 rounded-full" 
                        />
                    ):(
                        <span>Aucune photo</span>
                    )}
                </div>
                <div>
                    <h1 className="text-xl font-semibold">{nom}</h1>
                    <p className="text-gray-800 dark:text-gray-100">{prenom}</p>
                </div>
            </div>
            
            <div className="relative overflow-hidden w-[267px] h-[200px]">
                {/* Main */}
                <div className={`
                    absolute inset-0 transition-transform duration-300
                    ${activePage === "main" ? "translate-x-0" : "-translate-x-full"}
                `}>
                    <div className="flex flex-col font-semibold text-gray-600 dark:text-gray-100">
                        <button
                            className="flex gap-4 px-2 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg"
                        >
                            < UserCircle />
                            <p>Profile</p>
                        </button>
                        <button
                            onClick={() => setActivePage("apparence")}
                            className="flex justify-between px-2 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg"
                        >
                            <div className="flex gap-4">
                                < MoonIcon />
                                <p>Apparence</p>
                            </div>
                            <FiChevronRight className="size-6" />
                        </button>
                        <button
                            onClick={() => setActivePage("langue")}
                            className="flex justify-between px-2 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg"
                        >
                            <div className="flex gap-4">
                                < LanguagesIcon />
                                <p>Langue</p>
                            </div>
                            <FiChevronRight className="size-6" />
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={handleLogout}
                            className="flex gap-4 w-full mt-2 justify-center bg-fuchsia hover:bg-red-600 text-white rounded-lg py-3 cursor-pointer"
                        >
                            < LogOutIcon />
                            <p>DECONNECTER</p>
                        </button>
                    </div>
                </div>

                {/* Apparence */}
                <div className={`
                    absolute inset-0 transition-transform duration-300
                    ${activePage === "apparence" ? "translate-x-0" : "translate-x-full"}
                `}>
                    <div className=" font-semibold flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setActivePage("main")}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full cursor-pointer"
                            >
                                <ArrowLeft />   
                            </button>
                            <h1 className="text-xl">Apparence</h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="p-2 -mt-6 bg-gray-100 dark:bg-gray-600 rounded-full">
                                < MoonIcon />
                            </div>
                            <div>
                                <h2 className="text-lg">Mode sombre</h2>
                                <p className="text-sm text-gray-700 dark:text-gray-200 font-light">Ajustez l'apparence pour réduire les reflets et reposer vos yeux</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-10">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={darkMode == true}
                                    onChange={toggleDarkMode}
                                />
                                Activer
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={darkMode == false}
                                    onChange={toggleDarkMode}
                                />
                                Désactiver
                            </label>
                        </div>
                    </div>
                </div>

                {/* Langue */}
                <div className={`
                    absolute inset-0 transition-transform duration-300
                    ${activePage === "langue" ? "translate-x-0" : "translate-x-full"}
                `}>
                    <div className=" font-semibold flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setActivePage("main")}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full cursor-pointer"
                            >
                                <ArrowLeft />   
                            </button>
                            <h1 className="text-xl">Langue</h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="p-2 -mt-6 bg-gray-100 dark:bg-gray-600 rounded-full">
                                < LanguagesIcon />
                            </div>
                            <div>
                                <h2 className="text-lg">Langue</h2>
                                <p className="text-sm text-gray-700 dark:text-gray-200 font-light">Ajustez l'apparence pour réduire les reflets et reposer vos yeux</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-10">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    // checked={darkMode}
                                    // onChange={toggleDarkMode}
                                />
                                Français (France)
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    // checked={!darkMode}
                                    // onChange={toggleDarkMode}
                                />
                                English (US)
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
