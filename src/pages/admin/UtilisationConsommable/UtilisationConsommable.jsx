import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUtilisations, fetchSearchUtilisation, setQuery, createUtilisation, setPage, deleteUtilisation, updateUtilisation } from "../../../redux/slices/admin/utilisationConsommableSlice";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ConfirmModal from "../../../components/shared/confirmModal";
import UtilisationConsommableForm from "./UtilisationConsommableForm";
import { FiSearch, FiX } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";


export default function UtilisationConsommable() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages, query, limit: stateLimit = 11 } = useSelector((state) => state.utilisation);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUtilisation, setSelectedUtilisation] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
      const delay = 400;
      const timer = setTimeout(() => {
        if (query && query.trim() !== "") {
          // recherche live
          dispatch(fetchSearchUtilisation({ q: query.trim(), page, limit: stateLimit }));
        } else {
          // pas de query => fetch normal (pagination normale)
          dispatch(fetchUtilisations({ page, limit: stateLimit }));
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

    const handleAdd = () => {
      setSelectedUtilisation(null);
      setIsModalOpen(true);
    };

    const handleEdit = (utilisation) => {
      setSelectedUtilisation(utilisation);
      setIsModalOpen(true);
    };

    const handleDelete = (id) => {
      setDeleteId(id);
      setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
      dispatch(deleteUtilisation(deleteId));
      setIsConfirmOpen(false);
      setDeleteId(null);
    };

    const handleSubmit = (formData) => {
      if (selectedUtilisation) {
        dispatch(updateUtilisation({ id: selectedUtilisation.id, data: formData }));
      } else {
        dispatch(createUtilisation(formData));
      }
      setIsModalOpen(false);
    };

    return (
        <div className="h-screen dark:bg-gray-900 pt-22 pl-74 pr-10">
            <div className="flex justify-end">
                <button
                    onClick={handleAdd}
                    className=" gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-fuchsia hover:bg-red-400  dark:bg-fuchsia focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 shadow-md"       
                >
                    Ajouter <span className="text-2xl font-bold">+</span>
                </button>
            </div>

            <div className="flex justify-end mt-8 mb-4">
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

            <div className="overflow-x-auto rounded-lg">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-fuchsia text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Utilisateur</th>
                        <th className="py-3 px-4 text-left">Consommable</th>
                        <th className="py-3 px-4 text-left">Date d'Utilisation</th>
                        <th className="py-3 px-4 text-left">Quantité</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((utilisation, index) => (
                        <tr 
                            key={utilisation.id} 
                            className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                        >
                            <td className="py-2 px-4 font-medium">{index + 1}</td>
                            <td className="py-2 px-4">{utilisation.utilisateur?.nom || "_"}</td>
                            <td className="py-2 px-4">{utilisation.consommable?.nom || "_"}</td>
                            <td className="py-2 px-4">
                              {new Date(utilisation.dateUtilisation).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">{utilisation.quantiteUtilise}</td>
                            <td className="py-2 px-4">{utilisation.description}</td>
                            <td className="p-2 space-x-8 flex">
                                <button onClick={() => handleEdit(utilisation)} className="text-xl hover:text-white">
                                   <GrUpdate />
                                </button>
                                <button  onClick={() => handleDelete(utilisation.id)} className="text-red-500 text-2xl hover:text-white">
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
              <UtilisationConsommableForm
                onSubmit={handleSubmit}
                onClose={() => setIsModalOpen(false)}
                initialData={selectedUtilisation}
                items={items}
              />
            )}

            <ConfirmModal
              isOpen={isConfirmOpen}
              title="Confirmation"
              message="Voulez-vous vraiment supprimer cet utilisation de consommable ?"
              onConfirm={confirmDelete}
              onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
}