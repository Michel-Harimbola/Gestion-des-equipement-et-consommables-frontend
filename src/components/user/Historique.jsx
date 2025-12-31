import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom";

export default function Historique({ path1, path2, ID, setIsActive }) {
    const { t } = useTranslation();

    return (
        <div className="absolute -right-25">
            <div className="flex justify-center w-[250px] py-7 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                <div className="flex flex-col gap-2">
                    <Link 
                        to={path1} 
                        onClick={() => setIsActive(ID)}
                        className="hover:text-fuchsia"
                    >
                        {t("myLoans")}
                    </Link>
                    <Link 
                        to={path2} 
                        onClick={() => setIsActive(ID)}
                        className="hover:text-fuchsia"
                    >
                        {t("consumableUsage")}
                    </Link>
                </div>
            </div>
        </div>
    )
}