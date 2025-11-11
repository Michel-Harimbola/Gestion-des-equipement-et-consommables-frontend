import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchEquipements } from "../../redux/slices/user/equipementSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";


export default function Equipements() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector((state => state.equipement));
    const [filter, setFilter] = useState("all");

    
    useEffect(() => {
      dispatch(fetchEquipements());
    }, [dispatch]);
    
    const filteredItems = items.filter((eq) => {
      if (filter == "all") return true;
      return eq.etat == filter;
    });

    return (
      <div className="mt-24 ml-2 mr-6 dark:text-gray-50">
          <h1 className="text-4xl -ml-1 font-bold text-center lg:flex ">Tous les équipements</h1>

          {/* Boutons de filtre */}
          <div className="flex flex-wrap gap-3 mb-8 mt-10">
            {["all", "Disponible", "Emprunter", "EnMaintenance"].map((val) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className={`px-4 py-1 rounded-lg  transition cursor-pointer ${
                  filter === val
                    ? "bg-black dark:bg-gray-200 font-bold text-white dark:text-black"
                    : "bg-gray-100 dark:bg-gray-600 font-semibold hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
              >
                {val === "all" ? "Tous" : val}
              </button>
            ))}
          </div>

          {loading ? (
            <GlobalLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 space-x-16 mx-15 lg:mx-0 mb-13 mt-10">
                {filteredItems.length > 0 ? (
                  filteredItems.map((eq) => (
                    <div 
                      key={eq.id}
                      className="flex flex-col items-center space-y-5 bg-white dark:bg-gray-700 shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] py-8 lg:w-[290px] w-[350px] rounded-3xl"
                    >
                      <div>
                          <h1 className="font-semibold text-lg text-center">Nom de l'équipement:</h1>
                          <h1 className="text-xl font-semibold text-center">{eq.nom}</h1>
                      </div>
                      
                      <div className="flex flex-row justify-center items-center space-x-2">
                        <div 
                            className={`w-4 h-4 rounded-full ${eq.etat !== "Disponible"? "bg-red-600" : "bg-green-500"}`}
                        >
                        </div>
                        <p className="text-gray-600 dark:text-gray-200 font-normal">
                          {eq.etat}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => navigate("/userDashboard/Emprunter", { state: { equipementId: eq.id } })}
                        disabled={ eq.etat !== "Disponible" }
                        className={`text-white font-bold border border-transparent rounded-3xl px-4 py-2 ${eq.etat !== "Disponible"? 
                              "bg-gray-400 dark:bg-gray-500" 
                              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md cursor-pointer"}
                        `}>
                        Emprunter
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
      </div>
    )
}