import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEquipements } from "../../redux/slices/user/equipementSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";

export default function Equipements() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state => state.equipements));

    useEffect(() => {
        dispatch(fetchEquipements());
    }), [dispatch];

    return (
      <div className="">
        <div className="mt-36 mx-10">
          <h1 className="text-3xl font-semibold">Tous les équipements</h1> 
          {loading ? (
            <GlobalLoader />
          ) : (
            <div className="flex flex-row space-x-16 my-13">
                {items.map((eq) => (
                    <div className="flex flex-col items-center space-y-5 bg-gray-50 shadow-[0_0_30px_2px_rgba(0,0,0,0.1)] p-10 rounded-3xl">
                      <div>
                          <h1 className="font-semibold text-lg">Nom de l'équipement:</h1>
                          <h1 className="text-xl font-semibold">eq.nom</h1>
                      </div>
                      <p className="text-green-600 text-center">eq.etat</p>
                      <button className="bg-blue-600 text-white font-bold rounded-3xl px-4 py-2">Emprunter</button>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>
    )
}