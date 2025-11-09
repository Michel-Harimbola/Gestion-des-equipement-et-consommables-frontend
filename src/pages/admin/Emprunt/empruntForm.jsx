import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEquipements } from "../../../redux/slices/user/equipementSlice";


export default function EmpruntForm({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({
    dateRetourPrevu: "",
    equipementId: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      setForm({
        dateRetourPrevu: "",
        equipementId: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const { items } = useSelector((state => state.equipements));

  useEffect(() => {
      dispatch(fetchEquipements());
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-5">
          {initialData ? "Modifier l'emprunt" : "Ajouter un emprunt"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
              <h1 className="text-2xl font-semibold">Sélectionner un élément d'équipement</h1>
              <select   
                  value={form.equipementId}
                  onChange={handleChange}  
                  name="equipementId"
                  className="w-full text-xl pl-6 py-3 border-l-5 border-blue-700 rounded-sm appearance-none bg-white shadow-[0_0_8px_2px_rgba(0,0,0,0.1)]
                      focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 cursor-pointer">
                  {items
                    .filter((eq) => eq.etat === "Disponible")
                    .map((eq) => (
                    <option key={eq.id} value={eq.id}>
                        {eq.nom}
                    </option>
                  ))}
              </select>
          </div>
          <div className="space-y-4">
              <h1 className="text-2xl font-semibold">Date de retour prévu</h1>
              <input
                name="dateRetourPrevu"
                value={form.dateRetourPrevu}
                onChange={handleChange}
                type="date"
                className="w-full text-xl pl-6 py-3 border-l-5 border-blue-700 bg-white appearance-none rounded-sm p-2 shadow-[0_0_8px_2px_rgba(0,0,0,0.1)]
                focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 shadow-md"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md"
            >
              {initialData ? "Mettre à jour" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
