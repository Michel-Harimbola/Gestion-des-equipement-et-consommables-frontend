import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function LinkItem({ href, icon: Icon, text, badge }) {
    const location = useLocation();
    const isActive = location.pathname === href;
    const { t } = useTranslation();
    
    return (
        <li>
            <a
                href={href}
                className={`
                    flex items-center p-2 rounded-lg transition
                    text-gray-900 dark:text-white
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    ${isActive ? "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 font-semibold" : ""}
                `}
            >
                <Icon className="mr-3" />
                <span className="flex-1 me-3 text-lg">{t(text)}</span>
                {badge && (
                    <span
                        className={`inline-flex items-center justify-center px-2 ms-3 font-medium rounded-full ${badge.color} ${badge.darkColor}`}
                    >
                        {badge.text}
                    </span>
                )}
            </a>
        </li>
    )
}