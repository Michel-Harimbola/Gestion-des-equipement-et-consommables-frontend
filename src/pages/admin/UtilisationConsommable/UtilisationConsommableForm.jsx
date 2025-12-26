import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConsommables } from "../../../redux/slices/admin/ConsommableSlice";
import { useTranslation } from "react-i18next";


export default function EmpruntForm({ onSubmit, onClose, initialData = null }) {
    const { t } = useTranslation();
    const [form, setForm] = useState({
    consommableId: "",
    quantiteUtilise: "",
    description: "",
    });
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (initialData) {
        setForm({
          consommableId: initialData.consommableId || "",
          quantiteUtilise: initialData.quantiteUtilise || "",
          description: initialData.description || ""
        });
      }
    }, [initialData]);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      onSubmit({
          ...form,
      [name]: name === "consommableId" ? parseInt(value, 10) : value,
      });
    };
  
  const { items } = useSelector((state) => state.consommables);
  
  useEffect(() => {
    dispatch(fetchConsommables());
  }, [dispatch]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 w-full md:max-w-md max-w-sm shadow-lg">
        <h2 className="text-2xl dark:text-white font-semibold mb-5">
          {initialData ? "Modifier l'emprunt" : "Ajouter un emprunt"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
              <select   
                  value={form.consommableId}
                  onChange={handleChange}  
                  name="consommableId"
                  className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white dark:bg-gray-600
                    dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer">
                  {items
                    .filter((cons) => cons.quantiteUtilise !== 0)
                    .map((cons) => (
                    <option key={cons.id} value={form.consommableId = cons.id}>
                        {cons.nom}
                    </option>
                  ))}
              </select>
          </div>
          <div className="space-y-4">
              <input
                name="quantiteUtilise"
                value={form.quantiteUtilise}
                onChange={handleChange}
                placeholder="Quantité"
                type="number"
                className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 dark:bg-gray-600 dark:placeholder-gray-400 
                  dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia  cursor-pointer"
              />
          </div>
          <div className="space-y-4">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="description"
                type="description"
                className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 dark:bg-gray-600 dark:placeholder-gray-400 
                  dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia cursor-pointer"
              />
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
