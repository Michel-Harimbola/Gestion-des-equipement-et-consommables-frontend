import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { links } from "../../../constants/index";  
import { useTranslation } from "react-i18next";
import Footer from "./Footer";


export default function Sidebar({ isSidebarOpen }) {
    const { t } = useTranslation();

    const { role } = useSelector(state => state.auth.currentUser);

    const [isActive, setIsActive] = useState(1);

    return (
        <aside 
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-900
                dark:border-gray-700 transition-transform 
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            }
        >
            <div className="h-full flex flex-col justify-between">
                <div className="px-3 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {
                            links
                                .filter(link => link.roles.includes(role))
                                .map((link) => (
                                    <li key={link.id}>
                                        <Link
                                            to={link.href}
                                            onClick={() => setIsActive(link.id)}
                                            className={`
                                                flex items-center p-2 rounded-lg transition
                                                text-gray-900 dark:text-white
                                                hover:bg-gray-100 dark:hover:bg-gray-700
                                                ${isActive === link.id ? "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 font-semibold" : ""}
                                            `}
                                        >
                                            <link.icon className="mr-3 size-5"/>
                                            <span className="flex-1 me-3 text-lg">{t(link.text)}</span>
                                            {/* {link.badge && (
                                                <span
                                                    className={`inline-flex items-center justify-center px-2 ms-3 font-medium rounded-full ${link.badge.color} ${link.badge.darkColor}`}
                                                >
                                                    {link.badge.text}
                                                </span>
                                            )} */}
                                        </Link>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </aside>
    )
};