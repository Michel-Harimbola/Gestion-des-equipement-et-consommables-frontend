import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEmprunts } from "../../redux/slices/user/empruntSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";

export default function MesEmprunts() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.emprunts);
  const [filter, setFilter] = useState("all");
  

  useEffect(() => {
    dispatch(fetchUserEmprunts());
  }, [dispatch]);

  const filteredItems = items.filter((eq) => {
    if (filter == "all") return true;
    return eq.statut == filter;
  });

  return (
    <div className="mt-24 ml-4">
      <h1 className="text-4xl font-bold -ml-1">Mes emprunts</h1>
      
      <div className="flex space-x-5 mt-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1 rounded-lg font-semibold cursor-pointer ${filter == "all" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilter("EnCours")}
            className={`px-4 py-1 rounded-lg font-semibold cursor-pointer ${filter == "EnCours" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            EnCours
          </button>
          <button
            onClick={() => setFilter("Retourner")}
            className={`px-4 py-1 rounded-lg font-semibold cursor-pointer ${filter == "Retourner" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            Retourner
          </button>
        </div>

      {loading ? (
        <GlobalLoader />
      ):(
        <div className="overflow-x-auto shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] rounded-xl mt-10">
          <table className="min-w-full text-xl text-gray-700">
            <thead className="bg-sky-600 text-white ">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
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
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <td className="py-2 px-4 font-medium">{index + 1}</td>
                  <td className="py-2 px-4">
                    {new Date(emprunt.dateEmprunt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(emprunt.dateRetourPrevu).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {emprunt.dateRetourEffective == null ? "pas encore" : new Date(emprunt.dateRetourEffective).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-lg font-semibold ${
                        emprunt.statut === "EnCours"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {emprunt.statut}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {emprunt.equipement.map(eq => (
                      <p>{eq.nom}</p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
