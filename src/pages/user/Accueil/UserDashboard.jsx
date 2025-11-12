import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnCours } from "../../../redux/slices/user/EnCoursSlice"
import { CreateDemandeRetour } from "../../../redux/slices/user/demandeEmpruntSlice"; 
import DemandeEmprunt from "./DemandeEmprunt";
import GlobalLoader from "../../../components/shared/GlobalLoader";


export default function UserDashboard() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.enCours);

    useEffect(() => {
      dispatch(fetchEnCours());
    }, [dispatch]);

  const handleRetour = (equipementId,empruntId) => {
    console.log(equipementId);
    console.log("EN COURS DATA:", JSON.stringify(items, null, 2));
    dispatch(CreateDemandeRetour({ equipementId, empruntId }));
  };    

  return (
    <div className="mt-24 ml-4 mr-6 dark:text-gray-50">
      <h1 className="text-3xl font-semibold lg:flex text-center">Vos emprunts en cours</h1> 
      { loading? (
        <GlobalLoader />
      ) : items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-100 mt-16">Aucun emprunt en cours.</p>
      ) :(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {items.map((enCours) => (
            <div 
              key={enCours.id}
              className="flex flex-col space-y-1 bg-white dark:bg-gray-700 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] p-6 lg:p-8  rounded-2xl"
            >
              <div className="flex space-x-2">
                {enCours.equipement.map(eq => ( 
                  <h1 
                    key={`${enCours.id}-${eq.id}`}
                    className="text-2xl font-semibold">
                      {eq.nom}
                  </h1>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <p>Date d'emprunt :</p>
                <p>{new Date(enCours.dateEmprunt).toLocaleDateString()}</p>
              </div>
              <p>Date de retour prévue: <span>{new Date(enCours.dateRetourPrevu).toLocaleDateString()}</span></p>
              <div className="flex flex-row justify-between items-center -mt-2">
                <div className="flex flex-row items-center space-x-2 mt-2">
                  <div 
                    className={`w-4 h-4 rounded-full ${enCours.statut !== "EnCours"? "bg-red-600" : "bg-green-500"}`}
                  >
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-200 font-normal">
                    {enCours.statut}
                  </p>
                </div>
                <button 
                  onClick={() => handleRetour(enCours.equipement[0].id, enCours.id)}
                  className="flex space-x-2 px-4 py-2 border border-transparent text-lg font-medium rounded-lg text-white
                    bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md">
                  Retourner
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <DemandeEmprunt />   
    </div>
  );
}
