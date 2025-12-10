import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsommables, setPage, createConsommable, deleteConsommable, updateConsommable } from "../../../redux/slices/admin/ConsommableSlice";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ConsommableForm from "./consommableForm";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";


export default function Consommables() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages } = useSelector((state) => state.consommables);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConsommable, setSelectedConsommable] = useState(null);

    useEffect(() => {
      dispatch(fetchConsommables({ page, limit: 12 }));
    }, [dispatch, page]);

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
      if (window.confirm("Voulez-vous vraiment supprimer cet consommable ?")) {
        dispatch(deleteConsommable(id));
      }
    };

    const handleSubmit = (formData) => {
      if (selectedConsommable) {
        dispatch(updateConsommable({ id: selectedConsommable.id, data: formData }));
      } else {
        dispatch(createConsommable(formData));
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

            <div className="overflow-x-auto rounded-lg mt-10">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-fuchsia text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
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
                            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:even:bg-gray-700 dark:odd:bg-gray-800 dark:text-white transition-colors"
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
        </div>
    );
}