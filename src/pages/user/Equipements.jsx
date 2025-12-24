import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEquipements, fetchSearchEquipements, setPage, setQuery } from "../../redux/slices/user/equipementSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";
import Emprunter from "./Emprunter";
import ContratInfo from "./ContratInfo"; 
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiSearch, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";


export default function Equipements() {
  const dispatch = useDispatch();

  const { items, loading, page, totalPages, query, limit: stateLimit = 12 } = useSelector((state => state.equipement));
  const { user } = useSelector(state => state.auth);
  const role = user?.role;

  const [filter, setFilter] = useState("all");
  const [selectedEquipementId, setSelectedEquipementId] = useState(null);
  const [showContrat, setShowContrat] = useState(false);
  const [showEmprunter, setShowEmprunter] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const delay = 400;
    const timer = setTimeout(() => {
      if (query && query.trim() !== "") {
        dispatch(fetchSearchEquipements({ q: query.trim(), page, limit: stateLimit }));
      } else {
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

  const filteredItems = items.filter((eq) => {
    if (filter === "all") return true;
    return eq.disponibilite === filter;
  });

  const handleEmprunterClick = (equipementId) => {
    setSelectedEquipementId(equipementId);
    setShowContrat(true);
  };


  return (
    <div className="mt-24 px-4 sm:px-8 dark:text-gray-50 relative">
        <h1 className="text-3xl -ml-1 font-bold text-center lg:flex ">{t("allEquipements")}</h1>

        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 mt-10 gap-7">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["all", "Disponible", "Emprunte", "EnMaintenance"].map((val) => (
              <button
                key={val}
                onClick={() => {
                  setFilter(val);
                  dispatch(setPage(1));
                }}
                className={`px-4 py-1 rounded-lg  transition cursor-pointer ${
                  filter === val
                    ? "bg-black dark:bg-gray-200 font-bold text-white dark:text-black"
                    : "bg-gray-100 dark:bg-gray-600 font-semibold hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
              >
                { val === "all" 
                ? "Tous"
                : val === "Emprunte"
                ? "Emprunté"
                : val === "EnMaintenance"
                ? "En maintenance"
                : val
                }
              </button>
            ))}
          </div>
          
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
              {filteredItems.length > 0 ? (
                filteredItems.map((eq) => (
                  <div 
                    key={eq.id}
                    className="flex flex-col px-4 py-3 space-y-3 bg-white dark:bg-gray-700 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] lg:w-[290px] w-[350px] rounded-3xl"
                  >
                    <div>
                        <div className="flex items-center justify-center ">
                          {eq.photo ? (
                            <img
                              src={`http://localhost:3000${eq.photo}`}
                              alt={eq.nom}
                              className="w-55 h-40 object-cover rounded-3xl"
                            />
                          ) : (
                            <span>Aucune photo</span>
                          )}
                        </div>
                        
                        <div className="flex flex-col">
                          <p className="font-bold text-xl">{eq.marque}</p>
                          {role === "client" && (
                            <p className="font-semibold text-lg">Prix: {eq.prix} ar</p>
                          )}
                          <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">N° {eq.numeroDeSerie}</p>
                          <div className="flex justify-between items-center">
                            <div className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                              {eq.etatMateriel == "BonEtat" ? (
                                <p>{t("goodCondition")}</p>
                              ) : eq.etatMateriel == "EtatMoyen" ? (
                                <p>{t("averageCondition")}</p>
                              ) : eq.etatMateriel == "MauvaisEtat" ? (  
                                <p>{t("badCondition")}</p>
                              ) : eq.etatMateriel == "HorsUsage" ? (
                                <p>{t("outOfService")}</p>
                              ) : eq.etatMateriel == "EnReparation" ? (
                                <p>{t("underRepair")}</p>
                              ) : (
                                <p>{t("newCondition")}</p>
                              )}
                            </div>
                            
                            <div className="text-gray-700 flex justify-end dark:text-white font-semibold">
                              {eq.disponibilite == "Disponible"? (
                                <p className="bg-green-100 dark:bg-green-500 px-3 rounded-md">{t("availableStatus")}</p>
                              ): eq.disponibilite == "EnMaintenance" ? (
                                <p className="bg-blue-100 dark:bg-blue-500 px-3 rounded-md">{t("maintenance")}</p>
                              ):(
                                <p className="bg-red-100 dark:bg-red-500 px-3 rounded-md">{t("borrowed")}</p>
                              )}
                            </div>
                          </div>
                        </div>
                    </div>

                    <button 
                      onClick={() => handleEmprunterClick(eq.id)}
                      disabled={ eq.disponibilite !== "Disponible" }
                      className={`text-white text-xl font-bold border border-transparent rounded-xl w-full px-4 py-2 ${eq.disponibilite !== "Disponible"? 
                            "bg-gray-400 dark:bg-gray-500" 
                            : "bg-fuchsia border-3 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md cursor-pointer"}
                      `}>
                      {t("borrow")}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  {t("noEquipmentForFilter")}
                </p>
              )}
          </div>
        )}
        
        {showContrat && (
          <ContratInfo
            onClose={() => setShowContrat(false)}
            onNext={() => {
              setShowContrat(false);
              setShowEmprunter(true);
            }}
          />
        )}

        {showEmprunter && (
          <Emprunter
            selectedEquipementId={selectedEquipementId}
            onClose={() => setShowEmprunter(false)}
          />
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
    </div>
  )
}