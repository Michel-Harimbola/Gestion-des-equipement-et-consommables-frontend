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
        <div className="">
          <h1 className="text-3xl font-semibold lg:ml-7">Vos demandes </h1>
          {items.length === 0 ? (
            <p className="text-gray-600 mt-16 text-center">Aucun demande en attente. </p>
          ) : (
            <div className="overflow-auto h-[800px]">
            <div className="grid lg:grid-cols-1 gap-6 mt-10 lg:px-6">
                  {items.map((demande) => (
                    <div  
                      key={demande.id}
                      className="flex flex-col space-y-1 bg-white dark:bg-gray-700 dark:border dark:border-gray-500 dark:shadow-none 
                        shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] p-5 rounded-2xl">
                      <div className="flex justify-between text-lg font-semibold mr-1">
                        <h1 className="text-2xl font-semibold">{demande.equipement.marque}</h1>
                        <p>N° {demande.equipement.numeroDeSerie}</p>
                      </div>
                      <p>Date d'emprunt: <span>{new Date(demande.dateDemande).toLocaleDateString()}</span></p>
                      <p>Date de retour prévu: <span>{new Date(demande.dateRetourPrevu).toLocaleDateString()}</span></p>
                      <p>
                        {demande.equipement.etatMateriel == "BonEtat" ? (
                          <p>Etat matériel: Bon état</p>
                        ) : demande.equipement.etatMateriel == "EtatMoyen" ? (
                          <p>Etat matériel: Etat moyen</p>
                        ) : demande.equipement.etatMateriel == "MauvaisEtat" ? (  
                          <p>Etat matériel: Mauvais état</p>
                        ) : demande.equipement.etatMateriel == "HorsUsage" ? (
                          <p>Etat matériel: Hors usage</p>
                        ) : demande.equipement.etatMateriel == "EnReparation" ? (
                          <p>Etat matériel: En réparation</p>
                        ) : (
                          <p>Neuf</p>
                        )}
                      </p>
                      <div className="flex flex-row justify-between items-center -mt-2">
                        <div className="flex flex-row items-center space-x-2 mt-2">
                          <div className="w-4 h-4 rounded-full bg-gray-500 dark:bg-gray-400"></div>
                          <div className="text-center text-gray-600 dark:text-gray-200 font-normal">
                            {demande.type === "RETOUR" ? (
                              <p>Retour en attente</p>
                            ) : (
                              <p>Emprunt en attente</p>
                            )}
                            
                          </div>
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
            </div>
          )}
        </div>
    )
}