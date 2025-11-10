import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmprunts, approuverEmprunt, refuserEmprunt } from "../../../redux/slices/admin/DemandeEmpruntSlice";
import Title from "../../../ui/Title";
import GlobalLoader from "../../../components/shared/GlobalLoader";
import { LuCheck, LuX } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";


export default function Team() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.demandes);
    
    useEffect(() => {
          dispatch(fetchEmprunts());
        }, [dispatch]);

    return (
        <div className="bg-white p-3 rounded-2xl dark:bg-gray-700 dark:text-gray-300 flex-1 flex flex-col gap-5">
            <Title>Demandes d'emprunts</Title>
            { loading ? (
                <GlobalLoader />
            ) : (
                <div className="flex flex-col gap-3">
                    {items
                    .filter((demande) => demande.statut === "enAttente")
                    .map((demande, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="w-full flex felx-row justify-between dark:bg-gray-600 px-4 py-4 rounded-xl">
                                <div className="flex flex-row items-center gap-4">
                                    <div className="bg-gray-300 px-2 py-4 rounded-lg">
                                        <FaRegEnvelope className="w-8 h-8 dark:text-gray-600"/>
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-semibold text-white">{demande.utilisateur.nom} <span>{demande.utilisateur.prenom}</span></h1>
                                        <p><span className="font-semibold">Date de retour prévue: </span>{new Date(demande.dateRetourPrevu).toLocaleDateString()}</p>
                                        <p ><span className="font-semibold">Equipement: </span>{demande.equipement.nom}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <button
                                        onClick={() => dispatch(approuverEmprunt(demande.id))}
                                        className="bg-gray-200 dark:bg-gray-700 px-5 py-1 rounded-lg hover:bg-gray-800 cursor-pointer">
                                        <LuCheck className="w-7 h-7 text-green-600 dark:text-green-400"/>
                                    </button>
                                    <button 
                                        onClick={() => dispatch(refuserEmprunt(demande.id))}
                                        className="bg-gray-200 dark:bg-gray-700 px-5 py-1 rounded-lg hover:bg-gray-800 cursor-pointer">
                                        <LuX className="w-7 h-7 text-red-600 dark:text-red-400"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}