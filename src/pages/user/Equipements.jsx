import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEquipements } from "../../redux/slices/user/equipementSlice";
import GlobalLoader from "../../components/shared/GlobalLoader";
import Emprunter from "./Emprunter";
import ContratInfo from "./ContratInfo"; 


export default function Equipements() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state => state.equipement));
  const [filter, setFilter] = useState("all");
  const [selectedEquipementId, setSelectedEquipementId] = useState(null);

  const [showContrat, setShowContrat] = useState(false);
  const [showEmprunter, setShowEmprunter] = useState(false);

  useEffect(() => {
    dispatch(fetchEquipements());
  }, [dispatch]);
  
  const filteredItems = items.filter((eq) => {
    if (filter == "all") return true;
    return eq.disponibilite == filter;
  });

  const handleEmprunterClick = (equipementId) => {
    setSelectedEquipementId(equipementId);
    setShowContrat(true);
  };


  return (
    <div className="mt-24 ml-2 mr-6 dark:text-gray-50 relative">
        <h1 className="text-3xl -ml-1 font-bold text-center lg:flex ">Tous les équipements</h1>

        <div className="flex flex-wrap lg:justify-start items-center justify-center gap-3 mb-8 mt-10">
          {["all", "Disponible", "Emprunté", "En maintenance", "Indisponible"].map((val) => (
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
                    className="flex flex-col items-center space-y-5 bg-white dark:bg-gray-700 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] py-8 lg:w-[290px] w-[350px] rounded-3xl"
                  >
                    <div >
                        <h1 className="text-xl font-semibold text-center">{eq.nom}: </h1>
                        <p className="font-semibold text-lg text-center">{eq.marque}</p>
                        <p className="font-semibold text-lg text-center">N° {eq.numeroDeSerie}</p>
                        <div className="font-semibold text-lg text-center">
                          {eq.etatMateriel == "BonEtat" ? (
                            <p>Bon état</p>
                          ) : eq.etatMateriel == "EtatMoyen" ? (
                            <p>Etat moyen</p>
                          ) : eq.etatMateriel == "MauvaisEtat" ? (  
                            <p>Mauvais état</p>
                          ) : eq.etatMateriel == "HorsUsage" ? (
                            <p>Hors usage</p>
                          ) : eq.etatMateriel == "EnReparation" ? (
                            <p>En réparation</p>
                          ) : (
                            <p>Neuf</p>
                          )}
                        </div>
                    </div>
                    
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <div 
                          className={`w-4 h-4 rounded-full ${eq.disponibilite !== "Disponible"? "bg-red-600" : "bg-green-500"}`}
                      >
                      </div>
                      <div className="text-gray-600 dark:text-gray-200 font-normal">
                        {eq.disponibilite == "Disponible"? (
                          <p>Disponible</p>
                        ): eq.disponibilite == "EnMaintenance" ? (
                          <p>En maintenance</p>
                        ):(
                          <p>Emprunté</p>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleEmprunterClick(eq.id)}
                      disabled={ eq.disponibilite !== "Disponible" }
                      className={`text-white font-bold border border-transparent rounded-3xl px-4 py-2 ${eq.disponibilite !== "Disponible"? 
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
        
        {showContrat && (
          <ContratInfo
            onClose={() => setShowContrat(false)}
            onNext={() => {
              setShowContrat(false);
              setShowEmprunter(true);
            }}
          />
        )}

        {showEmprunter && (
          <Emprunter
            selectedEquipementId={selectedEquipementId}
            onClose={() => setShowEmprunter(false)}
          />
        )}
    </div>
  )
}