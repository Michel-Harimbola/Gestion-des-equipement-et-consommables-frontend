import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDemandesEnAttente, setPage, approuverEmprunt, refuserEmprunt } from "../../../redux/slices/admin/DemandeEmpruntSlice";
import { fetchRecentEmprunts } from "../../../redux/slices/admin/EmpruntSlice";
import MotifForm from "./MotifForm";
import Title from "../../../ui/Title";
import GlobalLoader from "../../shared/GlobalLoader";
import { LuCheck, LuX } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";


export default function DemandeEmprunt() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages } = useSelector((state) => state.demandes);

    const [openDetails, setOpenDetails] = useState({});
    const [showMotif, setShowMotif] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null);


    useEffect(() => {
        dispatch(fetchDemandesEnAttente({ page, limit: 3 }));
    }, [dispatch, page]);

    const handlePrev = () => {
        if (page > 1) dispatch(setPage(page - 1));
    };

    const handleNext = () => {
        if (page < totalPages) dispatch(setPage(page + 1));
    };

    const toggleDetails = (id) => {
        setOpenDetails(prev => ({ ...prev, [id]: !prev[id] }));
    }

    return (
        <div className="bg-white p-3 lg:h-[550px] rounded-2xl dark:bg-gray-700 dark:text-gray-300 flex-1 flex flex-col gap-4">
            <Title>Demandes d'emprunts</Title>
            { loading ? (
                <GlobalLoader />
            ) : (
                <div className="h-full overflow-y-auto">
                    <div className="flex flex-col gap-3">
                        {items
                        .map((demande, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="w-full flex flex-row justify-between bg-gray-100 dark:bg-gray-600 px-4 py-3 rounded-xl">
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="bg-slate-200 px-2 py-4 rounded-lg">
                                            <FaRegEnvelope className="w-8 h-8 dark:text-gray-600"/>
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-semibold dark:text-white">{demande.utilisateur.prenom}</h1>
                                            <p><span className="font-semibold">Nom: </span>{demande.equipement.nom}</p>

                                            {openDetails[demande.id] && (
                                                <>
                                                    <p><span className="font-semibold">Date de retour prévue: </span>{new Date(demande.dateRetourPrevu).toLocaleDateString()}</p>
                                                    <p><span className="font-semibold">Marque: </span>{demande.equipement.marque}</p>
                                                    <p><span className="font-semibold">Numéro de série: </span>{demande.equipement.numeroDeSerie}</p>
                                                    <p><span className="font-semibold">Usage: </span>{demande.usage}</p>
                                                </>
                                            )}

                                            <p><span className="font-semibold">Type: </span>{demande.type}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center gap-2">
                                        <button
                                            onClick={() => toggleDetails(demande.id)}
                                            className="p-2 bg-slate-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition-transform"
                                        >
                                            <FiChevronDown 
                                                className={`w-6 h-6 transition-transform ${openDetails[demande.id] ? 'rotate-90' : 'rotate-0'}`} 
                                            />
                                        </button>
                                        <div className="flex flex-col lg:flex-row gap-2">
                                            <button
                                                onClick={() => dispatch(approuverEmprunt(demande.id))
                                                    .unwrap()
                                                    .then(() => (dispatch(fetchRecentEmprunts())))

                                                }
                                                className="bg-slate-200 dark:bg-gray-700 px-5 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                                            >
                                                <LuCheck className="w-7 h-7 text-green-500 dark:text-green-400"/>
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setSelectedDemande(demande.id);
                                                    setShowMotif(true);
                                                }}
                                                className="bg-slate-200 dark:bg-gray-700 px-5 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                                            >
                                                <LuX className="w-7 h-7 text-red-500 dark:text-red-400"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pagination */}
            { totalPages > 1 && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-500 dark:text-gray-100 rounded disabled:opacity-40"
                    >
                        <FiChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="dark:text-gray-50 p-1">{page} / {totalPages}</span>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-500 dark:text-gray-100 rounded disabled:opacity-40"
                    >
                        <FiChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}

            {showMotif && (
                <MotifForm
                    onClose={() => setShowMotif(false)}
                    onSubmit={async (motif) => {
                        try {
                            await dispatch(refuserEmprunt({ id: selectedDemande, motif })).unwrap();
                            dispatch(fetchDemandesEnAttente({ page, limit: 3 }));
                            setShowMotif(false);
                        } catch (err) {
                            console.error("Erreur lors du refus :", err);
                        }
                    }}
                />
            )}

        </div>
    )
}
