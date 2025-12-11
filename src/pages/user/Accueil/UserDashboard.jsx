import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnCours } from "../../../redux/slices/user/EnCoursSlice"
import { CreateDemandeRetour, fetchUserDemandes } from "../../../redux/slices/user/demandeEmpruntSlice"; 
import DemandeEmprunt from "./DemandeEmprunt";
import GlobalLoader from "../../../components/shared/GlobalLoader";


export default function UserDashboard() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.enCours);

    useEffect(() => {
      dispatch(fetchEnCours());
      dispatch(fetchUserDemandes());
    }, [dispatch]);

  const handleRetour = async (equipementId,empruntId) => {
    await dispatch(CreateDemandeRetour({ equipementId, empruntId }));
    dispatch(fetchEnCours());
    dispatch(fetchUserDemandes());  
  };    

  return (
    <div className="mt-18 ml-4 dark:text-gray-50 lg:grid lg:grid-cols-3 md:grid-cols-1 gap-20">
      <div className=" col-span-2">
        <h1 className="text-3xl font-semibold lg:flex text-center">Vos emprunts en cours</h1> 
        { loading? (
          <GlobalLoader />
        ) : items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-100 mt-16">Aucun emprunt en cours.</p>
        ) :(
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:mr-10 mt-10 overflow-auto">
            {items.map((emprunt) => (
              <div 
                key={emprunt.id}
                className={`flex flex-col space-y-1 bg-white dark:bg-gray-700 border ${emprunt.statut === "EnRetard"? "border-red-400": "border-gray-300 dark:border-gray-500"} 
                  dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] p-6 rounded-2xl`}
              > 
                <div className="flex justify-between mb-2">
                  <div>
                      <h1 className="text-2xl font-semibold">
                        {emprunt.equipement.marque}
                      </h1>
                  </div>
                  <div className="flex space-x-2">
                      <p className="text-lg font-semibold mr-1">
                        N° {emprunt.equipement.numeroDeSerie}
                      </p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    {emprunt.equipement.nom}
                  </div>
                  <div className="flex space-x-2 mr-1 ">
                        {emprunt.equipement.etatMateriel == "BonEtat" ? (
                          <p>Bon état</p>
                        ) : emprunt.equipement.etatMateriel == "EtatMoyen" ? (
                          <p>Etat moyen</p>
                        ) : emprunt.equipement.etatMateriel == "MauvaisEtat" ? (  
                          <p>Mauvais état</p>
                        ) : emprunt.equipement.etatMateriel == "HorsUsage" ? (
                          <p>Hors usage</p>
                        ) : emprunt.equipement.etatMateriel == "EnReparation" ? (
                          <p>En réparation</p>
                        ) : (
                          <p>Neuf</p>
                        )}
                  </div>
                </div>

                <p>Date d'emprunt : <span>{new Date(emprunt.dateEmprunt).toLocaleDateString()}</span></p>
                <p>Date de retour prévue: <span>{new Date(emprunt.dateRetourPrevu).toLocaleDateString()}</span></p>
        
                <div className="flex flex-row justify-between items-center -mt-3">
                  <div className="flex flex-row items-center space-x-2 mt-2">
                    <div 
                      className={`w-4 h-4 rounded-full ${emprunt.statut !== "EnCours"? "bg-red-600" : "bg-green-500"}`}
                    >
                    </div>
                    <div className="text-center text-gray-600 dark:text-gray-200 font-normal">
                      { emprunt.statut == "EnCours" ? (
                        <p>En cours</p>
                      ):emprunt.statut == "EnRetard"? (
                        <p>En retard</p>
                      ):(
                        <p>En attente</p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRetour(emprunt.equipement.id, emprunt.id)}
                    className="flex space-x-2 px-4 py-2 border border-transparent text-lg font-medium rounded-lg text-white cursor-pointer
                      bg-fuchsia hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md">
                    Retourner
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DemandeEmprunt />   
    </div>
  );
}
