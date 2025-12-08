import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDemandes, deleteDemande, updateDemande } from "../../../redux/slices/admin/DemandeEmpruntSlice";
import DemandeForm from "./demandeForm";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";


export default function Demande() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.demandes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null);

    useEffect(() => {
      dispatch(fetchDemandes());
    }, [dispatch]);

    const handleEdit = (demande) => {
      setSelectedDemande(demande);
      setIsModalOpen(true);
    };

    const handleDelete = (id) => {
      if (window.confirm("Voulez-vous vraiment supprimer cet demande ?")) {
        dispatch(deleteDemande(id));
      }
    };

    const handleSubmit = (formData) => {
      if (selectedDemande) {
        dispatch(updateDemande({ id: selectedDemande.id, data: formData }));
      }
      setIsModalOpen(false);
    };

    return (
        <div className="h-screen dark:bg-gray-900 pt-22 pl-74 pr-10">
            <div className="overflow-x-auto rounded-lg mt-22">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-fuchsia text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Utilisateur</th>
                        <th className="py-3 px-4 text-left">Équipements</th>
                        <th className="py-3 px-4 text-left">Statut</th>
                        <th className="py-3 px-4 text-left">Date d’emprunt</th>
                        <th className="py-3 px-4 text-left">Date de retour prévu</th>
                        <th className="py-3 px-4 text-left">Type</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((demande, index) => (
                        <tr 
                            key={demande.id} 
                            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                        >
                            <td className="py-2 px-4 font-medium">{index + 1}</td>
                            <td className="py-2 px-4 font-medium">{demande.utilisateur.nom}</td>
                            <td className="py-2 px-4">{demande.equipement.nom}</td>
                            <td className="py-2 px-4 -ml-4 flex">
                                {demande.statut === "refuser"? (
                                  <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                                    Refuser
                                  </p>
                                ):(
                                  <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                                    Approuver
                                  </p>
                                )}
                            </td>
                            <td className="py-2 px-4">
                              {new Date(demande.dateDemande).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">
                              {new Date(demande.dateRetourPrevu).toLocaleDateString()}
                            </td>
                             <td className="py-2 px-4">{demande.type}</td>
                            <td className="p-2 space-x-8 flex">
                                <button onClick={() => handleEdit(demande)} className="text-xl hover:text-white">
                                   <GrUpdate />
                                </button>
                                <button  onClick={() => handleDelete(demande.id)} className="text-red-500 text-2xl hover:text-white">
                                   <FiDelete />
                                </button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>

            {isModalOpen && (
                <DemandeForm
                  onSubmit={handleSubmit}
                  onClose={() => setIsModalOpen(false)}
                  initialData={selectedDemande}
                  items={items}
                />
            )}
        </div>
    );
}