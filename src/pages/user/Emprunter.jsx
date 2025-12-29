import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createDemandeEmprunt } from "../../redux/slices/user/demandeEmpruntSlice";
import { fetchEquipements } from "../../redux/slices/user/equipementSlice";
import { useTranslation } from "react-i18next";

export default function Emprunter({ selectedEquipementId, onClose }) {
  const [form, setForm] = useState({
    dateRetourPrevu: "",
    usage: "",
    equipementId: selectedEquipementId || "",
  });

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items } = useSelector((state) => state.equipement);

  useEffect(() => {
    dispatch(fetchEquipements());
  }, [dispatch]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, equipementId: selectedEquipementId }));
  }, [selectedEquipementId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "equipementId" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createDemandeEmprunt(form)).unwrap();
    setForm(form);
    onClose(); 
  };

  const equipementsDisponibles = items.filter((eq) => eq.disponibilite === "Disponible");

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 dark:text-white w-[500px]">
        <h1 className="text-3xl -ml-1 font-bold lg:flex text-center">
          {t("rentalContract")}
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-12">
            <select   
                value={form.equipementId}
                onChange={handleChange}  
                name="equipementId"
                className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] dark:bg-gray-600  
                  dark:placeholder-white dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer"
                required
            >
              {equipementsDisponibles.length === 0 ? (
                <option value="">{t("noAvailableEquipment")}</option>
                ) : (
                  equipementsDisponibles.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.nom}
                    </option>
                  ))
                )
              }
            </select>
            
            <input
              type="date"
              name="dateRetourPrevu"
              value={form.dateRetourPrevu}
              onChange={handleChange}
              className="w-full text-xl pl-6 py-3 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] dark:bg-gray-600
                dark:placeholder-white dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia cursor-pointer"
              required
            />

            <textarea 
              name="usage" 
              type="description"
              value={form.usage}
              onChange={handleChange} 
              placeholder="Usage"
              className="w-full text-xl pl-3 pt-2 pb-8 border-l-5 border-fuchsia bg-white appearance-none rounded-sm p-2 shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] dark:bg-gray-600
                dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia cursor-pointer"
              required
            />
            
            <div className="flex flex-row justify-end gap-4 mt-8">
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
                className="text-white font-bold border border-transparent rounded-lg px-4 py-2 bg-fuchsia hover:bg-red-600 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md cursor-pointer"
              >
                {t("send")}
              </button>
            </div>
        
        </form>
      </div>
    </div>
  )
}