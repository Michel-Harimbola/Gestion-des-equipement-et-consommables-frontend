import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEmprunts } from "../../redux/slices/user/empruntSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";

export default function MesEmprunts() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.emprunts);

  useEffect(() => {
    dispatch(fetchUserEmprunts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-24">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Mes emprunts
      </h1>

      {loading ? (
        <GlobalLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((emprunt) => (
            <div
              key={emprunt.id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Emprunt n°{emprunt.id}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Date d’emprunt:</strong>{" "}
                {new Date(emprunt.dateEmprunt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Date retour prévu:</strong>{" "}
                {new Date(emprunt.dateRetourPrevu).toLocaleDateString()}
              </p>
              <p className="text-sm mb-4">
                <strong>Statut :</strong>{" "}
                <span
                  className={`font-semibold ${
                    emprunt.statut === "EnCours"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {emprunt.statut}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
