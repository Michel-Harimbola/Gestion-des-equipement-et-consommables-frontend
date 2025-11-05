import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEquipements } from "../../redux/slices/user/equipementSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";


export default function Equipements() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state => state.equipements));
    const [filter, setFilter] = useState("all");

    
    useEffect(() => {
      dispatch(fetchEquipements());
    }, [dispatch]);
    
    const filteredItems = items.filter((eq) => {
      if (filter == "all") return true;
      return eq.etat == filter;
    });

    return (
      <div className="">
        <div className="mt-24 ml-8">
          <h1 className="text-4xl -ml-2 font-bold">Tous les équipements</h1> 

          <div className="flex space-x-5 mt-10">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1 rounded-lg font-semibold ${filter == "all" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Tous
            </button>

            <button
              onClick={() => setFilter("Disponible")}
              className={`px-4 py-1 rounded-lg font-semibold ${filter == "Disponible" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Disponible
            </button>

            <button
              onClick={() => setFilter("Emprunter")}
              className={`px-4 py-1 rounded-lg font-semibold ${filter == "Emprunter" ? "bg-black text-white" : "bg-gray-200"}`}
            >
              Emprunter
            </button>
          </div>

          {loading ? (
            <GlobalLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 space-x-16 mb-13 mt-10">
                {filteredItems.length > 0 ? (
                  filteredItems.map((eq) => (
                    <div 
                      key={eq.id}
                      className="flex flex-col items-center space-y-5 bg-white shadow-[0_0_30px_2px_rgba(0,0,0,0.1)] py-8 w-[290px] rounded-3xl"
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
                        <p className="text-center text-gray-600 font-normal">
                          {eq.etat}
                        </p>
                      </div>
                      
                      <button 
                        disabled={ eq.etat !== "Disponible" }
                        className={`text-white font-bold border border-transparent rounded-3xl px-4 py-2 ${eq.etat !== "Disponible"? 
                              "bg-gray-400 " 
                              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md"}
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
      </div>
    )
}