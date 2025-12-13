import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsommables, fetchSearchConsommable, setPage, setQuery }from "../../../redux/slices/admin/ConsommableSlice";
import GlobalLoader from "../../../components/shared/GlobalLoader";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiSearch, FiX } from "react-icons/fi";
import UtilisationConsommable from "./UtilisationConsommable";


export default function Consommable() {
  const dispatch = useDispatch();

  const { items, loading, page, totalPages, query, limit: stateLimit = 12 } = useSelector((state => state.consommables));
  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUtilisationId, setSelectedUtilisationId] = useState(null);

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

  const handleUtilisationConsommableClick = (consommableId) => {
    setSelectedUtilisationId(consommableId);
    setShowPopup(true);
  };

  return (
    <div className="mt-24 ml-2 mr-6 dark:text-gray-50">
        <h1 className="text-3xl -ml-1 font-bold text-center lg:flex ">Tous les consommables</h1>

        <div className="flex lg:justify-end justify-center mb-8 mt-10">
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
          <GlobalLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 space-x-16 mx-15 lg:mx-0 mb-13 mt-10">
              {items.length > 0 ? (
                items.map((UC) => (
                  <div 
                    key={UC.id}
                    className="flex flex-col items-center space-y-5 bg-white dark:bg-gray-700 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] py-8 lg:w-[290px] w-[350px] rounded-3xl"
                  >
                    <div>
                        <h1 className="font-semibold text-lg text-center">Nom de la consommable:</h1>
                        <h1 className="text-xl font-semibold text-center">{UC.nom}</h1>
                    </div>
                    
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <p>Disponible: {UC.quantiteDisponible}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleUtilisationConsommableClick(UC.id)}
                      disabled={ UC.quantiteDisponible == 0 }
                      className={`text-white font-bold border border-transparent rounded-3xl px-4 py-2 ${UC.quantiteDisponible == 0 ? 
                            "bg-gray-400 dark:bg-gray-500" 
                            : "bg-fuchsia hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-150 shadow-md cursor-pointer"}
                      `}>
                      UTILISISER
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  Aucun équipement trouvé pour ce filtre.
                </p>
              )}
          </div>
        )}

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

        {/* Popup uitlisation consommable */}
        {showPopup && (
          <UtilisationConsommable
            selectedUtilisationId={selectedUtilisationId}
            onClose={() => setShowPopup(false)}
          />
        )}
    </div>
  )
}