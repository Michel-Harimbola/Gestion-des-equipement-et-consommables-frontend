import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEquipements } from "../../../redux/slices/admin/EquipementSlice";
import { useTranslation } from "react-i18next";


export default function EmpruntForm({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({
    dateRetourPrevu: "",
    equipementId: "",
    usage: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      setForm({
        dateRetourPrevu: initialData.dateRetourPrevu?.split("T")[0]  || "",
        equipementId: initialData.equipementId || "",
        usage: initialData.usage || ""
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
        dateRetourPrevu: new Date(form.dateRetourPrevu).toISOString()
    });
  };

  const { items } = useSelector((state => state.equipements));

  const { t } = useTranslation();

  useEffect(() => {
      dispatch(fetchEquipements());
  }, [dispatch]);

  const equipementsDisponibles = initialData
    ? items.filter((eq) => 
        eq.disponibilite === "Disponible" || eq.id === initialData.equipementId
      )
    : items.filter((eq) => eq.disponibilite === "Disponible");

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl dark:text-white font-semibold mb-5">
          {initialData ? t("editUser") : t("addLoan")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
              <select   
                  value={form.equipementId}
                  onChange={handleChange}  
                  name="equipementId"
                  className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white dark:bg-gray-600 dark:placeholder-gray-400 
                    dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer">
                  <option value="">{t("chooseEquipement")}</option>
                  {equipementsDisponibles.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                        {eq.marque}
                    </option>
                  ))}
              </select>
          </div>
          <div className="space-y-4">
              <input
                name="dateRetourPrevu"
                value={form.dateRetourPrevu}
                onChange={handleChange}
                type="date"
                className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 dark:bg-gray-600 dark:placeholder-gray-400 
                  dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia cursor-pointer"
              />
          </div>

          <textarea 
              name="usage" 
              type="description"
              value={form.usage}
              onChange={handleChange} 
              placeholder="Usage"
              className="w-full text-xl pl-3 pt-2 pb-8 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] dark:bg-gray-600
                dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia"
              required
            />

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
