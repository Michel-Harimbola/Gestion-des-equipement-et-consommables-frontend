import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsommables, fetchSearchConsommable, setPage, setQuery, createConsommable, deleteConsommable, updateConsommable } from "../../../redux/slices/admin/ConsommableSlice";
import { FiChevronLeft, FiChevronRight, FiSearch, FiX, FiDelete } from "react-icons/fi";
import ConfirmModal from "../../../components/shared/confirmModal";
import ConsommableForm from "./consommableForm";
import { MoreVertical } from "lucide-react";
import { GrUpdate } from "react-icons/gr";


export default function Consommables() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages, query, limit: stateLimit } = useSelector((state) => state.consommables);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConsommable, setSelectedConsommable] = useState(null);
    const [openMenuConsommableId, setOpenMenuConsommableId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
      const delay = 400;
      const timer = setTimeout(() => {
        if (query && query.trim() !== "") {
          dispatch(fetchSearchConsommable({ q: query.trim(), page, limit: stateLimit }));
        } else {
          dispatch(fetchConsommables({ page, limit: stateLimit }));
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
      setSelectedConsommable(null);
      setIsModalOpen(true);
    };

    const handleEdit = (consommable) => {
      setSelectedConsommable(consommable);
      setIsModalOpen(true);
    };

    const handleDelete = (id) => {
      setDeleteId(id);
      setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
      dispatch(deleteConsommable(deleteId));
      setIsConfirmOpen(false);
      setDeleteId(null);
    };

    const handleSubmit = (formData) => {
      if (selectedConsommable) {
        dispatch(updateConsommable({ id: selectedConsommable.id, data: formData }));
      } else {
        dispatch(createConsommable(formData));
      }
      setIsModalOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setOpenMenuConsommableId(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (isConfirmOpen || isModalOpen) {
        setOpenMenuConsommableId(null);
      }
    }, [isConfirmOpen, isModalOpen]);

    return (
        <div className="h-screen dark:bg-gray-900 pt-22 sm:pl-74 sm:pr-10 px-4">
            <div className="flex justify-between mb-5">
              <div className="mt-2">
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

              <div>
                  <button
                      onClick={handleAdd}
                      className=" gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                      bg-fuchsia hover:bg-red-400  dark:bg-fuchsia focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 shadow-md"       
                  >
                      Ajouter <span className="text-2xl font-bold">+</span>
                  </button>
              </div>
            </div>
            
            {/* Ordi */}
            <div className="hidden md:block overflow-x-auto rounded-lg">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-fuchsia text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">Photo</th>
                        <th className="py-3 px-4 text-left">Nom</th>
                        <th className="py-3 px-4 text-left">Quantité</th>
                        <th className="py-3 px-4 text-left">Seuil Critique</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((consommable, index) => (
                        <tr 
                          key={consommable.id} 
                          className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                        >
                            <td className="py-2 px-4 font-medium">{index + 1}</td>
                            <td className="py-2 px-4">{consommable.nom}</td>
                            <td className="py-2 px-4">{consommable.quantiteDisponible}</td>
                            <td className="py-2 px-4">{consommable.seuilCritique}</td>
                            <td className="p-2 space-x-8 flex">
                                <button onClick={() => handleEdit(consommable)} className="text-xl hover:text-white">
                                   <GrUpdate />
                                </button>
                                <button onClick={() => handleDelete(consommable.id)} className="text-red-500 text-2xl hover:text-white">
                                   <FiDelete />
                                </button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>

            {/* Mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:hidden dark:text-white">
              {items.map((consommable, index) => (
                <div
                  key={consommable.id}
                  className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex justify-between">
                    <div className="text-2xl font-semibold">
                      {consommable.nom}
                    </div>

                    <div 
                      className="relative" 
                      ref={openMenuConsommableId === consommable.id ? menuRef : null}
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuConsommableId(
                            openMenuConsommableId === consommable.id ? null : consommable.id
                          );
                        }}
                        className="-mt-2 -mr-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-2">
                          <MoreVertical />  
                      </button>

                      {openMenuConsommableId === consommable.id  && (
                        <div className="absolute right-7 -top-1 bg-gray-50 dark:bg-gray-600 rounded-xl">
                          <button
                            onClick={() => {
                              setOpenMenuConsommableId(null); 
                              handleEdit(consommable);
                            }}
                            className="flex items-center gap-3 w-full py-2 px-4 mr-6 text-left hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-gray-200 rounded-xl"
                          >
                            <GrUpdate />
                            Modifier
                          </button>
                          
                          <button
                            onClick={() => {
                              setOpenMenuConsommableId(null);
                              setIsConfirmOpen(true);
                            }}
                            className="flex items-center gap-3 w-full py-2 px-4 text-left text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-red-50 rounded-xl"
                          >
                            <FiDelete />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p>
                    <span className="font-medium">Quantité : </span>
                    {consommable.quantiteDisponible}
                  </p>
                  <p>
                    <span className="font-medium">Seuil critque : </span>
                    {consommable.seuilCritique}
                  </p>
                </div>
              ))}
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
                <ConsommableForm
                  onSubmit={handleSubmit}
                  onClose={() => setIsModalOpen(false)}
                  initialData={selectedConsommable}
                  items={items}
                />
            )}

            <ConfirmModal
              isOpen={isConfirmOpen}
              title="Confirmation"
              message="Voulez-vous vraiment supprimer cet consommable ?"
              onConfirm={confirmDelete}
              onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
}