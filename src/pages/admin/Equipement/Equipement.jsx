import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipements, createEquipement,fetchSearchEquipements, setQuery, setPage, deleteEquipement, updateEquipement } from "../../../redux/slices/admin/EquipementSlice";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ConfirmModal from "../../../components/shared/confirmModal";
import EquipementForm from "./equipementForm";
import { FiSearch, FiX } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
export default function Equipement() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages, query, limit: stateLimit = 11 } = useSelector((state) => state.equipements);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEquipement, setSelectedEquipement] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
      const delay = 400;
      const timer = setTimeout(() => {
        if (query && query.trim() !== "") {
          // recherche live
          dispatch(fetchSearchEquipements({ q: query.trim(), page, limit: stateLimit }));
        } else {
          // pas de query => fetch normal (pagination normale)
          dispatch(fetchEquipements({ page, limit: stateLimit }));
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
      setSelectedEquipement(null);
      setIsModalOpen(true);
    };

    const handleEdit = (equipement) => {
      setSelectedEquipement(equipement);
      setIsModalOpen(true);
    };

    const handleDelete = (id) => {
      setDeleteId(id);
      setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
      dispatch(deleteEquipement(deleteId));
      setIsConfirmOpen(false);
      setDeleteId(null);
    };

    const handleSubmit = (formData) => {
      if (selectedEquipement) {
        dispatch(updateEquipement({ id: selectedEquipement.id, data: formData }));
      } else {
        dispatch(createEquipement(formData));
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
                        <th className="py-3 px-4 text-left">Nom</th>
                        <th className="py-3 px-4 text-left">Numéro de série</th>
                        <th className="py-3 px-4 text-left">Marque</th>
                        <th className="py-3 px-4 text-left">Disponibilité</th>
                        <th className="py-3 px-4 text-left">Etat matériel</th>
                        <th className="py-3 px-4 text-left">Obtention</th>
                        <th className="py-3 px-4 text-left">Fournisseur</th>
                        <th className="py-3 px-4 text-left">Donateur</th>
                        <th className="py-3 px-4 text-left">Prix</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((equipement, index) => (
                        <tr 
                            key={equipement.id} 
                            className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                        >
                            <td className="py-2 px-4 font-medium">{index + 1}</td>
                            <td className="py-2 px-4">{equipement.nom}</td>
                            <td className="py-2 px-4">{equipement.numeroDeSerie}</td>
                            <td className="py-2 px-4">{equipement.marque}</td>
                            <td className="py-2 px-4 flex">
                              {equipement.disponibilite === "Emprunte"? (
                                <p className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-lg font-semibold">
                                  Emprunté
                                </p>
                              ):equipement.disponibilite === "EnMaintenance"? (
                                <p className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-lg font-semibold">
                                  En maintenance
                                </p>
                              ):(
                                <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                                  Disponible
                                </p>
                              )}
                            </td>
                            <td className="py-2 px-4">{equipement.etatMateriel}</td>
                            <td className="py-2 px-4">{equipement.obtention}</td>
                            <td className="py-2 px-4">{equipement.fournisseur}</td>
                            <td className="py-2 px-4">{equipement.donateur}</td>
                            <td className="py-2 px-4">{equipement.prix}</td>
                            <td className="p-2 space-x-8 flex">
                                <button onClick={() => handleEdit(equipement)} className="text-xl hover:text-white">
                                   <GrUpdate />
                                </button>
                                <button onClick={() => handleDelete(equipement.id)} className="text-red-500 text-2xl hover:text-white">
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
                <EquipementForm
                  onSubmit={handleSubmit}
                  onClose={() => setIsModalOpen(false)}
                  initialData={selectedEquipement}
                  items={items}
                />
            )}

            <ConfirmModal
              isOpen={isConfirmOpen}
              title="Confirmation"
              message="Voulez-vous vraiment supprimer cet équipement ?"
              onConfirm={confirmDelete}
              onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
}