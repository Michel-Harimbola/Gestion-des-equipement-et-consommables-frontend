import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


export default function EquipementForm({ onSubmit, onClose, initialData = null }) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    nom: "",
    marque: "",
    quantiteDisponible: "",
    seuilCritique: "",
    obtention: "Achat",
    categorie: "Bureautique",
    fournisseur: "",
    donnateur: "",
    photo: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nom: initialData.nom || "",
        marque: initialData.marque || "",
        quantiteDisponible: initialData.quantiteDisponible || "",
        seuilCritique: initialData.seuilCritique || "",
        obtention: initialData.obtention || "",
        categorie: initialData.categorie || "",
        fournisseur: initialData.fournisseur || "",
        donnateur: initialData.donateur || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      quantiteDisponible: Number(form.quantiteDisponible),
      seuilCritique: Number(form.seuilCritique),
    });
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 w-full sm:max-w-xl max-w-sm shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 dark:text-white">
          {initialData ? t("editEquipment") : t("addEquipment")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-5">
            <div className="flex-1 flex-col space-y-5">
              <input
                name='nom'
                value={form.nom}
                onChange={handleChange}
                type="text"
                placeholder={t("name")}
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                dark:text-white focus:ring-fuchsia transition duration-150"
                required
              /> 
              <input
                name='marque'
                value={form.marque}
                onChange={handleChange}
                type="text"
                placeholder={t("brand")}
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                dark:text-white focus:ring-fuchsia transition duration-150"
                required
              /> 
              <input
                name='quantiteDisponible'
                value={form.quantiteDisponible}
                onChange={handleChange}
                type="number"
                placeholder={t("quantity")}
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                  dark:text-white focus:ring-fuchsia transition duration-150"
                required
              /> 
              <input
                name='seuilCritique'
                value={form.seuilCritique}
                onChange={handleChange}
                type="number"
                placeholder={t("criticalThreshold")}
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                  dark:text-white focus:ring-fuchsia transition duration-150"
                required
              /> 
              <input 
                type="file" 
                accept="image/*"
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                  dark:text-white focus:ring-fuchsia transition duration-150"
                onChange={(e) => 
                  setForm({ ...form, photo: e.target.files[0] })
                }
              />
            </div>
            <div className="flex-1 flex-col space-y-5">
              <div className="relative">
                <select
                  name='categorie'
                  value={form.categorie}
                  onChange={handleChange}
                  className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white dark:bg-gray-600 dark:placeholder-gray-400
                      dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer"
                >
                  <option value="Bureautique">Bureautique</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Evenementiel">Evenementiel</option>
                  <option value="Nettoyage">Nettoyage</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Communication">Communication</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div className="relative">
                <select
                  name='obtention'
                  value={form.obtention}
                  onChange={handleChange}
                  className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white dark:bg-gray-600 dark:placeholder-gray-400
                      dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer"
                >
                  <option value="Achat">Achat</option>
                  <option value="Don">Don</option>
                </select>
              </div>
              <input
                name='fournisseur'
                value={form.fournisseur}
                onChange={handleChange}
                type="text"
                placeholder="Fournisseur"
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                  dark:text-white focus:ring-fuchsia transition duration-150"
              /> 
              <input
                name='donnateur'
                value={form.donnateur}
                onChange={handleChange}
                type="text"
                placeholder="Donateur"
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                  dark:text-white focus:ring-fuchsia transition duration-150"
              /> 
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 shadow-md"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-fuchsia hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md"
            >
              {initialData ? t("update") : t("create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
