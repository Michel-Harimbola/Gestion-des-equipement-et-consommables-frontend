import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserCircle, LogOutIcon, LanguagesIcon, MoonIcon, ArrowLeft } from 'lucide-react';
import { FiChevronRight } from "react-icons/fi";
import { Check } from "lucide-react";

export default function Setting({ darkMode, toggleDarkMode, handleLogout, photo, nom, prenom , setIsOpenSetting}) {
    const [activePage, setActivePage] = useState("main");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };


    return (
        <div className="absolute flex flex-col gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 w-[300px] right-0 top-14 rounded-xl p-4">
            <div className="flex gap-3 border-b pb-4 border-b-gray-200 dark:border-b-gray-700">
                <div>
                    {photo ? (
                        <img 
                            src={`http://localhost:3001${photo}`} 
                            alt={photo}
                            className="w-14 h-14 object-cover rounded-full" 
                        />
                    ):(
                        <span>{t("noPhoto")}</span>
                    )}
                </div>
                <div>
                    <h1 className="text-xl font-semibold">{nom}</h1>
                    <p className="text-gray-800 dark:text-gray-100">{prenom}</p>
                </div>
            </div>
            
            <div className="relative overflow-hidden w-[267px] h-[203px]">
                {/* Main */}
                <div className={`
                    absolute inset-0 transition-transform duration-300
                    ${activePage === "main" ? "translate-x-0" : "-translate-x-full"}
                `}>
                    <div className="flex flex-col font-semibold text-gray-600 dark:text-gray-100">
                        <button
                            onClick={() => {
                                navigate("/Profil");
                                setIsOpenSetting(null);
                            }}
                            className="flex gap-4 px-2 py-3 border border-transparent hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg focus:scale-90"
                        >
                            < UserCircle />
                            <p>{t("profile")}</p>
                        </button>
                        <button
                            onClick={() => setActivePage("apparence")}
                            className="flex justify-between px-2 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg"
                        >
                            <div className="flex gap-4">
                                < MoonIcon />
                                <p>{t("appearance")}</p>
                            </div>
                            <FiChevronRight className="size-6" />
                        </button>
                        <button
                            onClick={() => setActivePage("langue")}
                            className="flex justify-between px-2 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg"
                        >
                            <div className="flex gap-4">
                                < LanguagesIcon />
                                <p>{t("language")}</p>
                            </div>
                            <FiChevronRight className="size-6" />
                        </button>
                    </div>
                    <div className="px-2 mt-2">
                        <button 
                            onClick={handleLogout}
                            className="
                                flex justify-center space-x-2 py-2 border border-transparent text-lg font-medium rounded-lg text-white cursor-pointer w-full
                                bg-fuchsia hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md
                            "
                        >
                            < LogOutIcon />
                            <p>{t("logout")}</p>
                        </button>
                    </div>
                </div>

                {/* Apparence */}
                <div className={`
                    absolute inset-0 transition-transform duration-300
                    ${activePage === "apparence" ? "translate-x-0" : "translate-x-full"}
                `}>
                    <div className=" font-semibold flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setActivePage("main")}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full cursor-pointer"
                            >
                                <ArrowLeft />   
                            </button>
                            <h1 className="text-xl">{t("appearance")}</h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="p-2 -mt-6 bg-gray-100 dark:bg-gray-600 rounded-full">
                                < MoonIcon />
                            </div>
                            <div>
                                <h2 className="text-lg">{t("darkMode")}</h2>
                                <p className="text-sm text-gray-700 dark:text-gray-200 font-light">{t("appearanceDesc")}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 ml-12 mt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="theme"
                                    value="active"
                                    checked={darkMode == true}
                                    onChange={toggleDarkMode}
                                    className="sr-only"
                                />
                                <div>
                                    {darkMode && (
                                        <Check className="size-6 text-gray-500 dark:text-gray-300" />
                                    )}
                                </div>
                                <span className={`${darkMode ? "ml-0" : "ml-6"}`}>{t("enable")}</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="theme"
                                    value="inactive"
                                    checked={darkMode == false}
                                    onChange={toggleDarkMode}
                                    className="sr-only"
                                />
                                <div>
                                    {!darkMode && (
                                        <Check className="size-6 text-gray-500 dark:text-gray-300" />
                                    )}
                                </div>
                                <span className={`${!darkMode ? "ml-0" : "ml-6"}`}>{t("disable")}</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Langue */}
                <div className={`
                    absolute inset-0 transition-transform duration-300
                    ${activePage === "langue" ? "translate-x-0" : "translate-x-full"}
                `}>
                    <div className=" font-semibold flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setActivePage("main")}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full cursor-pointer"
                            >
                                <ArrowLeft />   
                            </button>
                            <h1 className="text-xl">{t("language")}</h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="p-2 -mt-6 bg-gray-100 dark:bg-gray-600 rounded-full">
                                < LanguagesIcon />
                            </div>
                            <div>
                                <h2 className="text-lg">{t("language")}</h2>
                                <p className="text-sm text-gray-700 dark:text-gray-200 font-light">{t("buttonsAndText")}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 ml-10 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="language"
                                    value="active"
                                    checked={i18n.language === "fr"}
                                    onChange={() => changeLang("fr")}
                                    className="sr-only"
                                />
                                <div className="">
                                    {i18n.language === "fr" && (
                                        <Check className="size-6 text-gray-500 dark:text-gray-300" />
                                    )}
                                </div>

                                <span className={`${i18n.language === "fr" ? "ml-0" : "ml-6"}`}>Français (FR)</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="language"
                                    value="inactive"
                                    checked={i18n.language === "en"}
                                    onChange={() => changeLang("en")}
                                    className="sr-only"
                                />
                                <div className="">
                                    {i18n.language === "en" && (
                                        <Check className="size-6 text-gray-500 dark:text-gray-300" />
                                    )}
                                </div>

                                <span className={`${i18n.language === "en" ? "ml-0" : "ml-6"}`}>English (US)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
