import { useState, useEffect } from "react";


export default function EtatMaterielForm({ onSubmit, onClose, initialData = null }) {
  const [etatMateriel, setEtatMateriel] = useState("Neuf");

  useEffect(() => {
    if (initialData?.etatMateriel) {
      setEtatMateriel(initialData.etatMateriel);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ etatMateriel });
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full sm:max-w-lg max-w-md">
        <p className="text-xl font-semibold mb-5 dark:text-white">
          Merci de vérifier et ajuster l’état de l’équipement avant le retour.
        </p>

        <form 
            onSubmit={handleSubmit} 
            className="space-y-5"
        >
            <div className="relative">
            <select
                name='etatMateriel'
                value={etatMateriel}
                onChange={(e) => setEtatMateriel(e.target.value)}
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
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
