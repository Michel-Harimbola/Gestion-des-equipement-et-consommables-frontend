import { useState, useEffect } from "react";
import { Eye, EyeOff } from 'lucide-react';


export default function UserForm({ onSubmit, onClose, initialData = null }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motdepasse: "",
    role: "personnelInterne",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nom: initialData.nom || "",
        prenom: initialData.prenom || "",
        email: initialData.email || "",
        role: initialData.role || "personnelInterne",
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 w-full md:max-w-md max-w-sm shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 dark:text-white">
          {initialData ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name='nom'
            value={form.nom}
            onChange={handleChange}
            type="text"
            placeholder="Votre nom"
            className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white dark:bg-gray-600 dark:placeholder-gray-400
              dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
            required
          /> 
          <input
            name='prenom'
            value={form.prenom}
            onChange={handleChange}
            type="text"
            placeholder="Votre prénom"
            className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white dark:bg-gray-600 dark:placeholder-gray-400
              dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
            required
          /> 
          <input
            name='email'
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Votre email"
            className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white dark:bg-gray-600 dark:placeholder-gray-400
              dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
            required
          /> 

          {!initialData && (
            <>
              <div className="relative">
                <input
                  name='motdepasse'
                  value={form.motdepasse}
                  onChange={handleChange}
                  type={ showPassword ? "text" : "password" }
                  placeholder="votre mot de passe"
                  className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white dark:bg-gray-600 dark:placeholder-gray-400
                    dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="relative">
                <input
                  type={ showPassword ? "text" : "password" }
                  placeholder="Confirmer votre mot de passe"
                  className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm bg-white dark:bg-gray-600 dark:placeholder-gray-400
                    dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </>
          )}
          
          <div className="relative">
            <select
              name='role'
              value={form.role}
              onChange={handleChange}
              className="w-full pl-5 pr-4 py-3 border-l-5 border-fuchsia rounded-sm appearance-none bg-white dark:bg-gray-600 dark:placeholder-white
                  dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia transition duration-150 cursor-pointer"
            >
              <option value="" disabled>Choisir un rôle</option>
                    <option value="client">client</option>
                    <option value="partenaire">Partenaire</option>
                    <option value="personnelInterne">Personnel interne</option>
                    <option value="regisseurEquipementInterne">Régisseur des équipement interne</option>
            </select>
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
              {initialData ? "Mettre à jour" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
