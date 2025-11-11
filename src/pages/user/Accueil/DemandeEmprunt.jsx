import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDemandes, annulerDemande } from "../../../redux/slices/user/demandeEmpruntSlice";


export default function DemandeEmprunt() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.demande);

    useEffect(() => {
      dispatch(fetchUserDemandes());
    }, [dispatch]);

    return (
        <div className="mt-10">
          <h1 className="text-3xl font-semibold ">Vos demandes d'emprunts </h1>
          {items.length === 0 ? (
            <p className="text-gray-600 mt-16">Aucun demande en attente. </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
                  {items.map((demande) => (
                    <div  
                      key={demande.id}
                      className="flex flex-col space-y-1 bg-white shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] p-8  rounded-2xl">
                      <h1>Nom de l'équipement: <span className="text-xl font-semibold"> {demande.equipement.nom}</span></h1>
                      <p>Date d'emprunt: <span>{new Date(demande.dateDemande).toLocaleDateString()}</span></p>
                      <p>Date de retour prévu: <span>{new Date(demande.dateRetourPrevu).toLocaleDateString()}</span></p>
                      <div className="flex flex-row justify-between items-center -mt-2">
                        <div className="flex flex-row items-center space-x-2 mt-2">
                          <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                          <p className="text-center text-gray-600 font-normal">
                            {demande.statut}
                          </p>
                        </div>

                        <button 
                          onClick={() => dispatch(annulerDemande(demande.id))}
                          className="flex space-x-2 px-4 py-2 border border-transparent text-lg font-medium rounded-lg text-white
                            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md">
                          Annuler
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
    )
}