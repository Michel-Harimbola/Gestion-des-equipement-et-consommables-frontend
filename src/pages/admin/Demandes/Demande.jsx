import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDemandes, createDemande, deleteDemande, updateDemande } from "../../../redux/slices/admin/DemandeEmpruntSlice";
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

    const handleAdd = () => {
      setSelectedDemande(null);
      setIsModalOpen(true);
    };

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
      } else {
        dispatch(createDemande(formData));
      }
      setIsModalOpen(false);
    };

    return (
        <div className="h-screen dark:bg-gray-800 pt-22 pl-74 pr-10">
            <div className="flex justify-end">
                <button
                    onClick={handleAdd}
                    className=" gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md"       
                >
                    Ajouter <span className="text-2xl font-bold">+</span>
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg mt-10">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-sky-500 dark:bg-blue-900 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Date d’emprunt</th>
                        <th className="py-3 px-4 text-left">Date de retour prévu</th>
                        <th className="py-3 px-4 text-left">Date de retour effective</th>
                        <th className="py-3 px-4 text-left">Statut</th>
                        <th className="py-3 px-4 text-left">Équipements</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((demande, index) => (
                        <tr 
                            key={demande.id} 
                            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:even:bg-gray-700 dark:odd:bg-gray-800 dark:text-white transition-colors"
                        >
                            <td className="py-2 px-4 font-medium">{index + 1}</td>
                            <td className="py-2 px-4">
                              {new Date(demande.dateDemande).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">
                              {new Date(demande.dateRetourPrevu).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">
                              {demande.dateRetourEffective == null ? "pas encore" : new Date(demande.dateRetourEffective).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-lg font-semibold ${
                                  demande.statut === "EnCours"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {demande.statut}
                              </span>
                            </td>
                            <td className="py-2 px-4">{demande.equipement.nom}</td>
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