import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEquipements } from "../../redux/slices/user/equipementSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";

export default function Equipements() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state => state.equipements));

    useEffect(() => {
        dispatch(fetchEquipements());
    }, [dispatch]);

    return (
      <div className="">
        <div className="mt-36 mx-10">
          <h1 className="text-3xl font-semibold">Tous les équipements</h1> 
          {loading ? (
            <GlobalLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 space-x-16 my-13">
                {items.map((eq) => (
                    <div 
                      key={eq.id}
                      className="flex flex-col items-center space-y-5 bg-white shadow-[0_0_30px_2px_rgba(0,0,0,0.1)] py-8 w-[290px] rounded-3xl">
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
                        className="bg-blue-600 text-white font-bold rounded-3xl px-4 py-2">
                        Emprunter
                      </button>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>
    )
}