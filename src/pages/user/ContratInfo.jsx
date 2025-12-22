import { useState } from "react";
import { useTranslation } from "react-i18next";


export default function ContratInfo({ onClose, onNext }) {
  const [accepted, setAccepted] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[500px] dark:text-gray-100">

        <h1 className="text-3xl font-bold text-center mb-6">{t("borrowingConditions")}</h1>

        <div className="space-y-4 text-lg leading-relaxed">
          <p><strong>{t("name")}</strong> {t("equipmentNameDesc")}</p>
          <p><strong>{t("serialNumber")}</strong> {t("serialHelp")}</p>
          <p><strong>{t("brand")}</strong> {t("brandHelp")}</p>
          <p><strong>{t("usage")}</strong> {t("usageHelp")}</p>
          <p><strong>{t("state")}</strong> {t("conditionHelp")}</p>
          <p className="text-red-600 dark:text-red-400">
            ⚠️ {t("borrowingRule")}
          </p>
        </div>

        <div className="flex items-center mt-6 gap-3">
          <input
            type="checkbox"
            id="accept"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
            className="w-5 h-5"
          />
          <label htmlFor="accept" className="text-lg">{t("acceptConditions")}</label>
        </div>

        <div className="flex justify-end mt-8 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 dark:bg-gray-600 rounded-lg text-white hover:bg-gray-500"
          >
            {t("cancel")}
          </button>

          <button
            onClick={onNext}
            disabled={!accepted}
            className={`${accepted
                ? "bg-fuchsia hover:bg-red-600 cursor-pointer"
                : "bg-red-300 cursor-not-allowed"
              } px-4 py-2 rounded-lg text-white font-bold`}
          >
            {t("next")}
          </button>
        </div>

      </div>
    </div>
  );
}
