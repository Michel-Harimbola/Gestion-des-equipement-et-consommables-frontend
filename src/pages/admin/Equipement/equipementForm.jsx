import { useState, useEffect } from "react";


export default function EquipementForm({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({
    nom: "",
    type: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nom: initialData.nom || "",
        type: initialData.type || "",
        etat: initialData.etat || "",
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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-5">
          {initialData ? "Modifier l'équipement" : "Ajouter un équipement"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name='nom'
            value={form.nom}
            onChange={handleChange}
            type="text"
            placeholder="Votre nom"
            className="w-full pl-5 pr-4 py-3 border-l-5 border-blue-700 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            required
          /> 
          <input
            name='type'
            value={form.type}
            onChange={handleChange}
            type="text"
            placeholder="Votre type"
            className="w-full pl-5 pr-4 py-3 border-l-5 border-blue-700 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            required
          /> 
          <div className="relative">
            <select
              name='role'
              value={form.etat}
              onChange={handleChange}
              className="w-full pl-5 pr-4 py-3 border-l-5 border-blue-700 rounded-sm appearance-none bg-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 cursor-pointer"
            >
              <option value="Disponible">Disponible</option>
              <option value="EnMaintenance">En Maintenance</option>
              <option value="Emprunter">Emprunter</option>
            </select>
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
