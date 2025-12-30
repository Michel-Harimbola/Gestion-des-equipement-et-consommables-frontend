import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


export default function EquipementForm({ onSubmit, onClose, initialData = null }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    nom: "",
    numeroDeSerie: "",
    marque: "",
    disponibilite: "Disponible",
    etatMateriel: "Neuf",
    obtention: "Achat",
    fournisseur: "",
    donateur: "",
    prix: "",
    photo: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nom: initialData.nom || "",
        numeroDeSerie: initialData.numeroDeSerie || "",
        marque: initialData.marque || "",
        disponibilite: initialData.disponibilite || "",
        etatMateriel: initialData.etatMateriel || "",
        obtention: initialData.obtention || "",
        fournisseur: initialData.fournisseur || "",
        donateur: initialData.donateur || "",
        prix: initialData.prix || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSend = {};

    for (let key in form) {
      if (form[key] !== "" && form[key] !== null) {
        // Convertir prix en nombre si c'est le champ
        dataToSend[key] = key === "prix" ? Number(form[key]) : form[key];
      }
    }

    // Exclure photo si non modifié
    if (!form.photo) delete dataToSend.photo;

    onSubmit(dataToSend); 
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full sm:max-w-xl max-w-md">
        <h2 className="text-2xl font-semibold mb-5 dark:text-white">
          {initialData ? "Modifier l'équipement" : "Ajouter un équipement"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-5">
            <div className="flex-1 flex-col space-y-5">
              <input
                name='nom'
                value={form.nom}
                onChange={handleChange}
                type="text"
                placeholder="Nom"
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                      dark:text-white focus:ring-fuchsia transition duration-150"
                required
              /> 
              <input
                name='numeroDeSerie'
                value={form.numeroDeSerie}
                onChange={handleChange}
                type="text"
                placeholder="Numéro de série"
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                  dark:text-white focus:ring-fuchsia transition duration-150"
                required
              /> 
              <input
                name='marque'
                value={form.marque}
                onChange={handleChange}
                type="text"
                placeholder="Marque"
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                  dark:text-white focus:ring-fuchsia transition duration-150"
                required
              /> 
              <div className="relative">
                <select
                  name='disponibilite'
                  value={form.disponibilite}
                  onChange={handleChange}
                  className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white dark:bg-gray-600 dark:placeholder-gray-400
                      dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="EnMaintenance">En Maintenance</option>
                  <option value="Emprunte">{t("borrowed")}</option>
                  <option value="Indisponible">Indisponible</option>
                </select>
              </div>
              <div className="relative">
                <select
                  name='etatMateriel'
                  value={form.etatMateriel}
                  onChange={handleChange}
                  className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white dark:bg-gray-600 dark:placeholder-gray-400
                      dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer"
                >
                  <option value="Neuf">Neuf</option>
                  <option value="BonEtat">Bon état</option>
                  <option value="EtatMoyen">Etat moyen</option>
                  <option value="MauvaisEtat">Mauvais état</option>
                  <option value="HorsUsage">Hors usage</option>
                  <option value="EnReparation">En réparation</option>
                </select>
              </div>
            </div>

            <div className="flex-1 flex-col space-y-5">
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
                name='donateur'
                value={form.donateur}
                onChange={handleChange}
                type="text"
                placeholder="Donateur"
                className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white focus:outline-none focus:ring-2 dark:bg-gray-600 dark:placeholder-gray-400
                  dark:text-white focus:ring-fuchsia transition duration-150"
              /> 
              <input
                name='prix'
                value={form.prix}
                onChange={handleChange}
                type="number"
                placeholder="Prix"
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
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 shadow-md"
            >
              Annuler
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
