import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";


export default function Setting() {
    const { t, i18n } = useTranslation();

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    return (
        <div className="flex dark:text-white mt-35 ml-[350px]">
            <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-semibold">Paramètre de langue</h1>
                <p>Les paramètres de langue s'appliquent à votre compte</p>

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
    )
}