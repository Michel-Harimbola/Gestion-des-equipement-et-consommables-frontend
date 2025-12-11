import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDemandes, fetchSearchDemandeEmprunt, setQuery, setPage, deleteDemande, updateDemande } from "../../../redux/slices/admin/DemandeEmpruntSlice";
import ConfirmModal from "../../../components/shared/confirmModal";
import DemandeForm from "./demandeForm";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiSearch, FiX } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";


export default function Demande() {
  const dispatch = useDispatch();
  const { items, loading, page, totalPages, query, limit: stateLimit = 12 } = useSelector((state) => state.demandes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const delay = 400;
    const timer = setTimeout(() => {
      if (query && query.trim() !== "") {
        // recherche live
        dispatch(fetchSearchDemandeEmprunt({ q: query.trim(), page, limit: stateLimit }));
      } else {
        // pas de query => fetch normal (pagination normale)
        dispatch(fetchDemandes({ page, limit: stateLimit }));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [dispatch, query, page, stateLimit]);

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  const handleEdit = (demande) => {
    setSelectedDemande(demande);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteDemande(deleteId));
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = (formData) => {
    if (selectedDemande) {
      dispatch(updateDemande({ id: selectedDemande.id, data: formData }));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen dark:bg-gray-900 pt-22 pl-74 pr-10">
      <div className="overflow-x-auto rounded-lg mt-21">

        <div className="flex justify-end mb-4">
          <div className="relative">
                      
            <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />

            <input
              type="text"
              value={query}
              onChange={(e) =>{ 
                dispatch(setQuery(e.target.value));
                dispatch(setPage(1));
              }}
              placeholder="Rechercher"
              className="pl-10 pr-9 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />

            {query && (
              <button
                onClick={() => {
                  dispatch(setQuery(""));
                  dispatch(setPage(1));
                }}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="min-w-full text-lg text-gray-700">
            <thead className="bg-fuchsia text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Prénom</th>
                <th className="py-3 px-4 text-left">Équipements</th>
                <th className="py-3 px-4 text-left">Marque</th>
                <th className="py-3 px-4 text-left">N° série</th>
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
                    className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                >
                    <td className="py-2 px-4 font-medium">{index + 1}</td>
                    <td className="py-2 px-4 font-medium">{demande.utilisateur.nom}</td>
                    <td className="py-2 px-4 font-medium">{demande.utilisateur.prenom}</td>
                    <td className="py-2 px-4">{demande.equipement.nom}</td>
                    <td className="py-2 px-4">{demande.equipement.marque}</td>
                    <td className="py-2 px-4">{demande.equipement.numeroDeSerie}</td>
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
        
      {/* Pagination */}
      { totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
              onClick={handlePrev}
              disabled={page === 1}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-100 rounded disabled:opacity-40"
          >
            <FiChevronLeft className="w-7 h-7" />
          </button>
          <span className="dark:text-gray-50 p-1">{page} / {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-100 rounded disabled:opacity-40"
          >
            <FiChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}

      {isModalOpen && (
        <DemandeForm
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
          initialData={selectedDemande}
          items={items}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Confirmation"
        message="Voulez-vous vraiment supprimer cet demande ?"
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}