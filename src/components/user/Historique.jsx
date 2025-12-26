import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom";

export default function Historique({ path1, path2 }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col w-[300px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl">
            <Link to={path1} className="px-4 pb-1 pt-2 hover:bg-gray-50 dark:hover:bg-gray-700">{t("myLoans")}</Link>
            <Link to={path2} className="px-4 pt-1 pb-2 hover:bg-gray-50 dark:hover:bg-gray-700">{t("consumableUsage")}</Link>
        </div>
    )
}