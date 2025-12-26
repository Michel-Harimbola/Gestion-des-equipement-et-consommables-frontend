import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEmprunts, searchUserEmprunts, setPage, setQuery } from "../../redux/slices/user/empruntSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";
import { t } from "i18next";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiSearch, FiX } from "react-icons/fi";

export default function MesEmprunts() {
  const dispatch = useDispatch();

  const { items, loading, page, totalPages, query, limit: stateLimit = 10 } = useSelector((state) => state.emprunt);
  
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const delay = 400;
    const timer = setTimeout(() => {
      if (query && query.trim() !== "") {
        dispatch(searchUserEmprunts({ q: query.trim(), page, limit: stateLimit }));
      } else {
        dispatch(fetchUserEmprunts({ page, limit: stateLimit }));
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
    return eq.statut === filter;
  });

  return (
    <div className="mt-24 px-4 sm:px-8 dark:text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center lg:flex lg:justify-start">{t("myLoans")}</h1>

      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 mt-10 gap-3">
        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          {["all", "EnCours", "EnRetard", "Retourner"].map((val) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-4 py-1 rounded-lg font-semibold transition cursor-pointer ${
                filter === val
                  ? "bg-black dark:bg-gray-200 font-bold text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-600 font-semibold hover:bg-gray-200 dark:hover:bg-gray-500"
              }`}
            >
              { val === "all" 
              ? t("all")
              : val === "EnCours"
              ? t("inProgress")
              : val === "EnRetard" 
              ? t("late")
              : t("return")
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
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      

      {loading ? (
        <GlobalLoader />
      ) : (
        <>
          {/* ordi */}
          <div className="hidden md:block overflow-x-auto shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] rounded-xl">
            <table className="w-full text-sm sm:text-base text-gray-700">
              <thead className="bg-fuchsia text-white">
                <tr>
                  <th className="py-3 px-4 text-left">{t("photo")}</th>
                  <th className="py-3 px-4 text-left">N° </th>
                  <th className="py-3 px-4 text-left">{t("equipments")}</th>
                  <th className="py-3 px-4 text-left">{t("brand")}</th>
                  <th className="py-3 px-4 text-left">{t("borrowDate")}</th>
                  <th className="py-3 px-4 text-left">{t("expectedReturnDate")}</th>
                  <th className="py-3 px-4 text-left">{t("actualReturnDate")}</th>
                  <th className="py-3 px-4 text-left">{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((emprunt, index) => (
                  <tr
                    key={emprunt.id}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:even:bg-gray-900 dark:odd:bg-gray-800 dark:text-white transition-colors"
                  >
                    <td className="p-2">
                      {emprunt.equipement.photo ? (
                        <img
                          src={`http://localhost:3000${emprunt.equipement.photo}`}
                          alt={emprunt.equipement.nom}
                          className="w-18 h-12 object-cover rounded-xl"
                        />
                      ):(
                        <span>{t("noPhoto")}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">{emprunt.equipement.numeroDeSerie}</td>
                    <td className="py-2 px-4">{emprunt.equipement.nom}</td>
                    <td className="py-2 px-4">{emprunt.equipement.marque}</td>
                    <td className="py-2 px-4">
                      {new Date(emprunt.dateEmprunt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(emprunt.dateRetourPrevu).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {emprunt.dateRetourEffective == null
                        ? "Pas encore"
                        : new Date(emprunt.dateRetourEffective).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 flex">
                                {emprunt.statut === "EnCours"? (
                                  <p className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-lg font-semibold">
                                    {t("inProgress")}
                                  </p>
                                ):emprunt.statut === "EnRetard"?(
                                  <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                                    {t("late")}
                                  </p>
                                ):(
                                  <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                                    {t("return")}
                                  </p>
                                )}
                            </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile / tablette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {filteredItems.map((emprunt, index) => (
              <div
                key={emprunt.id}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
              >
                <div className="flex justify-between mb-2">
                  <div className="text-2xl font-semibold">
                    {emprunt.equipement.nom}
                  </div>
                </div>
                <p>
                  <span className="font-medium">{t("borrowDate")} : </span>
                  {new Date(emprunt.dateEmprunt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">{t("expectedReturn")} : </span>
                  {new Date(emprunt.dateRetourPrevu).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">{t("actualReturn")} : </span>
                  {emprunt.dateRetourEffective == null
                    ? "Pas encore"
                    : new Date(emprunt.dateRetourEffective).toLocaleDateString()}
                </p>

                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${emprunt.statut === "EnCours"? "bg-green-500": "bg-yellow-600"}`}></span>
                    <p>{emprunt.statut}</p>
                  </div>
                  <h2 className="font-bold text-lg mr-1">
                    {index + 1}
                  </h2>
                </div>

              </div>
            ))}
          </div>
        </>
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
  );
}
