import { useTranslation } from "react-i18next"

export default function Card({ data }) {
    const { t } = useTranslation();
    return (
        <div className="bg-white pl-6 py-5 pr-18 rounded-2xl flex items-center gap-5 dark:bg-gray-700 dark:text-gray-400">
            <span className={`${data.bgColor} px-3 py-6 dark:text-gray-300 text-2xl rounded-2xl dark:bg-gray-500`}>
                <data.icon />
            </span>
            <div className="">
                <h2 className="text-1xl">
                    <span className="text-2xl font-bold">{data.count}</span>
                </h2>
                <div className="font-bold">
                    {   data.title === "Total utilisateurs"? (
                        <p>Total <br/>{t("users")}</p>
                    ): data.title === "Emprunts en cours"?(
                        <p>{t("loans")} <br/>{t("inProgress")}</p>
                    ): t("critical") === "Critical"? (
                        <p>{t("critical")} <br/>{t("consumables")}</p>
                    ): (
                        <p>{t("consumables")} <br/>{t("critical")}</p>
                    )}
                </div>
            </div>
        </div>
    )
}