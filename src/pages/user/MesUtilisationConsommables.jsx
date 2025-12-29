import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUtilisation, fetchSearchUserUtilisation, setPage, setQuery } from "../../redux/slices/admin/utilisationConsommableSlice";
import { FiChevronLeft, FiChevronRight, FiSearch, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function MesUtilisationConsommables() {
  const dispatch = useDispatch();
    const { items, loading, page, totalPages, query, limit: stateLimit } = useSelector((state) => state.utilisation);

    const { t } = useTranslation();

    useEffect(() => {
      const delay = 400;
      const timer = setTimeout(() => {
        if (query && query.trim() !== "") {
          dispatch(fetchSearchUserUtilisation({ q: query.trim(), page, limit: stateLimit }));
        } else {
          dispatch(fetchUserUtilisation({ page, limit: stateLimit }));
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

    return (
      <div className="h-screen dark:bg-gray-800 pt-24 sm:px-8 px-4">
          <h1 className="text-3xl dark:text-white sm:text-4xl font-bold text-center lg:flex lg:justify-start">{t("consumableUsage")}</h1>
          <div className="flex justify-end mt-10 mb-8">
            <div className="relative">
                        
              <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />

              <input
                type="text"
                value={query}
                onChange={(e) =>{ 
                  dispatch(setQuery(e.target.value));
                  dispatch(setPage(1));
                }}
                placeholder={t("research")}
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
                  <FiX size={18} className="cursor-pointer" />
                </button>
              )}
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
                      <th className="py-3 px-4 text-left">{t("photo")}</th>
                      <th className="py-3 px-4 text-left">{t("consumable")}</th>
                      <th className="py-3 px-4 text-left">{t("usageDate")}</th>
                      <th className="py-3 px-4 text-left">{t("usedQuantity")}</th>
                      <th className="py-3 px-4 text-left">{t("description")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((utilisation, index) => (
                      <tr 
                        key={utilisation.id} 
                        className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                      >
                          <td className="p-2">
                            {utilisation.consommable.photo ? (
                                <img
                                  src={`http://localhost:3001${utilisation.consommable.photo}`}
                                  alt={utilisation.consommable.nom}
                                  className="w-13 object-cover rounded-xl"
                                />
                              ) : (
                                <span>{t("noPhoto")}</span>
                              )}
                          </td>
                          <td className="py-2 px-4">{utilisation.consommable?.nom}</td>
                          <td className="py-2 px-4">{new Date(utilisation.dateUtilisation).toLocaleDateString()}</td>
                          <td className="py-2 px-4">{utilisation.quantiteUtilise}</td>
                          <td className="py-2 px-4">{utilisation.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>

          {/* Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:hidden dark:text-white">
            {items.map((utilisation, index) => (
              <div
                key={utilisation.id}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
              >
                <div className="text-2xl font-semibold">
                    {utilisation.consommable?.nom}
                </div>
                <p>
                  <span className="font-medium">{t("usageDate")} : </span>
                  {new Date(utilisation.dateUtilisation).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">{t("usedQuantity")} : </span>
                  {utilisation.quantiteUtilise}
                </p>
                <p>
                  <span className="font-medium">{t("description")} : </span>
                  {utilisation.description}
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
      </div>
  );
}