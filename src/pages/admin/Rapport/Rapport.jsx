import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRapports, deleteRapport, setPage } from "../../../redux/slices/admin/RapportSlice";
import { FiChevronLeft, FiChevronRight, FiDelete } from "react-icons/fi";
import ConfirmModal from "../../../components/shared/confirmModal";
import ExportPDF from "../../../components/admin/ExportPDF";
import { MoreVertical } from "lucide-react";


export default function Rapport() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages } = useSelector((state) => state.rapports);

    const [openMenuId, setOpenMenuId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const menuRef = useRef(null);

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

    useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isConfirmOpen) {
      setOpenMenuId(null);
    }
  }, [isConfirmOpen]);

  return (
    <div className="h-screen dark:bg-gray-900 pt-22 lg:pl-74 lg:pr-10 px-4">
      {/* Ordi */}
      <div className="md:block hidden overflow-x-auto rounded-lg mt-32">
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <table className="min-w-full text-lg text-gray-700">
              <thead className="bg-fuchsia text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Mois</th>
                  <th className="py-3 px-4 text-left">Total emprunts</th>
                  <th className="py-3 px-4 text-left">En cours</th>
                  <th className="py-3 px-4 text-left">En retard</th>
                  <th className="py-3 px-4 text-left">Retournés</th>
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
                      className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 
                      dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                    >
                      <td className="p-2">
                        {new Date(data.periode.debut).toLocaleDateString()} →{" "}
                        {new Date(data.periode.fin).toLocaleDateString()}
                      </td>

                      <td className="p-2">{data.emprunts.total}</td>
                      <td className="p-2">{data.emprunts.enCours}</td>
                      <td className="p-2">{data.emprunts.enRetard}</td>
                      <td className="p-2">{data.emprunts.retournes}</td>

                      <td className="p-2">
                        {data.consommation.quantiteTotaleUtilisee}
                      </td>

                      <td className="p-2">
                        {data.stock.consommablesDisponibles}
                      </td>

                      <td className="p-2">{rapport.periode}</td>

                      <td className="p-2 flex gap-4">
                        <ExportPDF rapport={rapport} />

                        <button
                          onClick={() => handleDelete(rapport.id)}
                          className="text-red-500 text-xl hover:text-red-700"
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
      
      {/* Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 lg:hidden dark:text-white">
        {items.map((rapport, index) => {
          const data = JSON.parse(rapport.contenu);

          return (
            <div
              key={rapport.id}
              className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between -mb-2">
                <p className="font-medium"><span>Période: </span></p>
                
                <div 
                  className="relative" 
                  ref={openMenuId === rapport.id ? menuRef : null}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === rapport.id ? null : rapport.id
                      );
                    }}
                    className="-mt-2 -mr-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-2">
                      <MoreVertical />  
                  </button>

                  {openMenuId === rapport.id  && (
                    <div className="absolute right-7 -top-1 bg-gray-50 dark:bg-gray-600 rounded-xl">
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-3 w-full py-2 px-4 mr-6 text-left hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-gray-200 rounded-xl"
                      >
                        <div className="">                         
                          <ExportPDF />
                        </div>
                        Télecharger
                      </button>
                      
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
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
              {/* <p className="font-medium"><span>Total emprunt: </span>{data.utilisationEquipements}</p>
              <p className="font-medium">Consommation Totale: {data.consommationTotale}</p>
              <p className="font-medium">Stock disponible: {data.stockDisponible}</p>
              <p className="font-medium">Période: {rapport.periode}</p> */}
            </div>
          );
        })}
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