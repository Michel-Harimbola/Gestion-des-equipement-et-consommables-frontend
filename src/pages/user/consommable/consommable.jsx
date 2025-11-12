import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchConsommables }from "../../../redux/slices/admin/ConsommableSlice"
import GlobalLoader from "../../../components/shared/GlobalLoader";


export default function Consommable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector((state => state.consommables))
    const [filter, setFilter] = useState("all");

    useEffect(() => {
      dispatch(fetchConsommables());
    }, [dispatch]);

    return (
      <div className="mt-24 ml-2 mr-6 dark:text-gray-50">
          <h1 className="text-3xl -ml-1 font-bold text-center lg:flex ">Tous les consommables</h1>

          {loading ? (
            <GlobalLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 space-x-16 mx-15 lg:mx-0 mb-13 mt-10">
                {items.length > 0 ? (
                  items.map((eq) => (
                    <div 
                      key={eq.id}
                      className="flex flex-col items-center space-y-5 bg-white dark:bg-gray-700 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] py-8 lg:w-[290px] w-[350px] rounded-3xl"
                    >
                      <div>
                          <h1 className="font-semibold text-lg text-center">Nom de la consommable:</h1>
                          <h1 className="text-xl font-semibold text-center">{eq.nom}</h1>
                      </div>
                      
                      <div className="flex flex-row justify-center items-center space-x-2">
                        <p>Disponible: {eq.quantiteDisponible}</p>
                      </div>
                      
                      <button 
                        disabled={ eq.quantiteDisponible == 0 }
                        className={`text-white font-bold border border-transparent rounded-3xl px-4 py-2 ${eq.quantiteDisponible == 0 ? 
                              "bg-gray-400 dark:bg-gray-500" 
                              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md cursor-pointer"}
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
      </div>
    )
}