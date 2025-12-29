import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnCours } from "../../../redux/slices/user/EnCoursSlice"
import { CreateDemandeRetour, fetchUserDemandes } from "../../../redux/slices/user/demandeEmpruntSlice"; 
import DemandeEmprunt from "./DemandeEmprunt";
import EtatMaterielForm from "./EtatMaterielForm";
import GlobalLoader from "../../../components/shared/GlobalLoader";
import { useTranslation } from "react-i18next";


export default function UserDashboard() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, loading } = useSelector((state) => state.enCours);

  const [showEtatForm, setShowEtatForm] = useState(false);
  const [selectedEmprunt, setSelectedEmprunt] = useState(null);

  const handleRetourClick = (emprunt) => {
    setSelectedEmprunt(emprunt);
    setShowEtatForm(true);
  };

  useEffect(() => {
    dispatch(fetchEnCours());
    dispatch(fetchUserDemandes());
  }, [dispatch]);

  const handleSubmitRetour = async ({ etatMateriel }) => {
    await dispatch(
      CreateDemandeRetour({
        equipementId: selectedEmprunt.equipement.id,
        empruntId: selectedEmprunt.id,
        etatMateriel,
      })
    );

    setShowEtatForm(false);
    setSelectedEmprunt(null);

    dispatch(fetchEnCours());
    dispatch(fetchUserDemandes());
  };

  return (
    <div className="mt-24 px-4 sm:px-8 dark:text-gray-50 lg:grid lg:grid-cols-3 md:grid-cols-1 gap-20">
      <div className=" col-span-2">
        <h1 className="text-3xl font-semibold lg:flex text-center">{t("currentLoans")}</h1> 
        { loading? (
          <GlobalLoader />
        ) : items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-100 mt-16">{t("noCurrentLoan")}</p>
        ) :(
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:mr-10 mt-10 overflow-auto">
            {items.map((emprunt) => (
              <div 
                key={emprunt.id}
                className={`flex flex-col space-y-1 bg-white dark:bg-gray-700 border ${emprunt.statut === "EnRetard"? "border-red-400": "border-gray-400 dark:border-gray-500"} 
                  dark:shadow-none  p-6 rounded-2xl`}
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
                          <p>{t("goodCondition")}</p>
                        ) : emprunt.equipement.etatMateriel == "EtatMoyen" ? (
                          <p>{t("averageCondition")}</p>
                        ) : emprunt.equipement.etatMateriel == "MauvaisEtat" ? (  
                          <p>{t("badCondition")}</p>
                        ) : emprunt.equipement.etatMateriel == "HorsUsage" ? (
                          <p>{t("outOfService")}</p>
                        ) : emprunt.equipement.etatMateriel == "EnReparation" ? (
                          <p>{t("underRepair")}</p>
                        ) : (
                          <p>{t("newCondition")}</p>
                        )}
                  </div>
                </div>

                <p>{t("borrowDate")} : <span>{new Date(emprunt.dateEmprunt).toLocaleDateString()}</span></p>
                <p>{t("expectedReturnDate")} : <span>{new Date(emprunt.dateRetourPrevu).toLocaleDateString()}</span></p>
        
                <div className="flex flex-row justify-between items-center -mt-3">
                  <div className="flex flex-row items-center space-x-2 mt-2">
                    <div 
                      className={`w-4 h-4 rounded-full ${emprunt.statut !== "EnCours"? "bg-red-600" : "bg-green-500"}`}
                    >
                    </div>
                    <div className="text-center text-gray-600 dark:text-gray-200 font-normal">
                      { emprunt.statut == "EnCours" ? (
                        <p>{t("inProgress")}</p>
                      ):emprunt.statut == "EnRetard"? (
                        <p>{t("late")}</p>
                      ):(
                        <p>{t("pending")}</p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRetourClick(emprunt)}
                    className="flex space-x-2 px-4 py-2 border border-transparent text-lg font-medium rounded-lg text-white cursor-pointer
                      bg-fuchsia hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia transition duration-150 shadow-md">
                    {t("return")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEtatForm && (
        <EtatMaterielForm
          onSubmit={handleSubmitRetour}
          onClose={() => setShowEtatForm(false)}
        />
      )}

      <DemandeEmprunt />   
    </div>
  );
}
