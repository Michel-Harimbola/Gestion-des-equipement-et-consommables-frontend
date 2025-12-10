import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEmprunts, setPage } from "../../redux/slices/user/empruntSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


export default function MesEmprunts() {
  const dispatch = useDispatch();
  const { items, loading, page, totalPages } = useSelector((state) => state.emprunt);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchUserEmprunts({ page, limit: 12 }));
  }, [dispatch, page]);

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
      <h1 className="text-3xl sm:text-4xl font-bold text-center lg:flex lg:justify-start">Mes emprunts</h1>

      {/* Boutons de filtre */}
      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-10 mb-8">
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
            ? "Tous" 
            : val === "EnCours"
            ? "En cours"
            : val === "EnRetard" 
            ?"En ratard"
            : "Retourné"
            }
          </button>
        ))}
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
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Date d’emprunt</th>
                  <th className="py-3 px-4 text-left">Date de retour prévu</th>
                  <th className="py-3 px-4 text-left">Date de retour effective</th>
                  <th className="py-3 px-4 text-left">Statut</th>
                  <th className="py-3 px-4 text-left">Équipements</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((emprunt, index) => (
                  <tr
                    key={emprunt.id}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:even:bg-gray-900 dark:odd:bg-gray-800 dark:text-white transition-colors"
                  >
                    <td className="py-2 px-4 font-medium">{index + 1}</td>
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
                                    En cours
                                  </p>
                                ):emprunt.statut === "EnRetard"?(
                                  <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                                    En retard
                                  </p>
                                ):(
                                  <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                                    Retourné
                                  </p>
                                )}
                            </td>
                    <td className="py-2 px-4">
                      {emprunt.equipement.nom}
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
                  <span className="font-medium">Date d’emprunt : </span>
                  {new Date(emprunt.dateEmprunt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Retour prévu : </span>
                  {new Date(emprunt.dateRetourPrevu).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Retour effectif : </span>
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
