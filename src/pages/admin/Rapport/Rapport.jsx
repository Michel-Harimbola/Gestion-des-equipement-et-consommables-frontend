import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRapports, deleteRapport, setPage } from "../../../redux/slices/admin/RapportSlice";
import ConfirmModal from "../../../components/shared/confirmModal";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import ExportPDF from "../../../components/admin/ExportPDF";


export default function Rapport() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages } = useSelector((state) => state.rapports);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
      dispatch(fetchRapports({ page, limit: 12 }));
    }, [dispatch, page]);

    const handlePrev = () => {
      if (page > 1) dispatch(setPage(page - 1));
    };
  
    const handleNext = () => {
      if (page < totalPages) dispatch(setPage(page + 1));
    };

    const handleDelete = (id) => {
      setDeleteId(id);
      setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
      dispatch(deleteRapport(deleteId));
      setIsConfirmOpen(false);
      setDeleteId(null);
    };

    return (
      <div className="h-screen dark:bg-gray-900 pt-22 pl-74 pr-10">

            <div className="overflow-x-auto rounded-lg mt-32">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-fuchsia text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Période</th>
                        <th className="py-3 px-4 text-left">Utilisation équipements</th>
                        <th className="py-3 px-4 text-left">Consommation Totale</th>
                        <th className="py-3 px-4 text-left">Stock disponible</th>
                        <th className="py-3 px-4 text-left">Période</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((rapport, index) => {
                        const data = JSON.parse(rapport.contenu);

                        return (
                          <tr 
                            key={rapport.id} 
                            className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 
                              dark:odd:bg-gray-900 dark:text-white transition-colors"
                          >
                            <td className="p-2">{index + 1}</td>

                            <td className="p-2">{data.periode}</td>
                            <td className="p-2">{data.utilisationEquipements}</td>
                            <td className="p-2">{data.consommationTotale}</td>
                            <td className="p-2">{data.stockDisponible}</td>
                            <td className="p-2">{rapport.periode}</td>

                            <td className="p-2 space-x-8 flex">
                              <div>
                                <ExportPDF rapports={items} />
                              </div>
                              <button
                                onClick={() => handleDelete(rapport.id)}
                                className="text-red-500 text-2xl hover:text-marine dark:hover:text-white"
                              >
                                <FiDelete />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
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

            <ConfirmModal
              isOpen={isConfirmOpen}
              title="Confirmation"
              message="Voulez-vous vraiment supprimer cet rapport ?"
              onConfirm={confirmDelete}
              onCancel={() => setIsConfirmOpen(false)}
            />
      </div>
    );
}