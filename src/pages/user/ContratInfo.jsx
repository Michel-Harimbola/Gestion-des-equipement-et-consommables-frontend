import { useState } from "react";


export default function ContratInfo({ onClose, onNext }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[500px] dark:text-gray-100">

        <h1 className="text-3xl font-bold text-center mb-6">Conditions d’emprunt</h1>

        <div className="space-y-4 text-lg leading-relaxed">
          <p><strong>Nom :</strong> Nom et description de l’équipement.</p>
          <p><strong>Numéro de série :</strong> Veuillez insérer le numéro de série attribué à l’équipement.</p>
          <p><strong>Marque :</strong> Marque ou modèle de l’équipement.</p>
          <p><strong>Usage :</strong> Insérer la raison et le nom de celui/celle qui va utiliser l’équipement en dehors du bureau.</p>
          <p><strong>État :</strong> Neuf, bon état, état moyen, mauvais état, hors usage, en réparation.</p>
          <p className="text-red-600 dark:text-red-400">
            ⚠️ On n’emprunte que les équipements en bon état, avec un contrat de location.
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
          <label htmlFor="accept" className="text-lg">J’ai lu et j’accepte les conditions.</label>
        </div>

        <div className="flex justify-end mt-8 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 dark:bg-gray-600 rounded-lg text-white hover:bg-gray-500"
          >
            Annuler
          </button>

          <button
            onClick={onNext}
            disabled={!accepted}
            className={`${accepted
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed"
              } px-4 py-2 rounded-lg text-white font-bold`}
          >
            Suivant
          </button>
        </div>

      </div>
    </div>
  );
}
