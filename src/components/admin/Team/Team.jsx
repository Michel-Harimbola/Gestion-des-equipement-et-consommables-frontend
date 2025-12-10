import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecentEmprunts } from "../../../redux/slices/admin/EmpruntSlice";
import GlobalLoader from "../../shared/GlobalLoader";
import Title from "../../../ui/Title";
import { FaRegEnvelope } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";



export default function Event() {
    const dispatch = useDispatch();
    const { recent, loading } = useSelector((state) => state.emprunts);

    useEffect(() => {
        dispatch(fetchRecentEmprunts());
    }, [dispatch]);

    const [openDetails, setOpenDetails] = useState({});
    const toggleDetails = (id) => {
        setOpenDetails(prev => ({ ...prev, [id]: !prev[id] }));
    }

    return (
        <div className="bg-white p-5 rounded-2xl dark:bg-gray-700 dark:text-gray-300 flex-1 flex flex-col gap-5 lg:h-[460px]">
            <Title>Les emprunts le plus récent</Title>
            {loading? (
                <GlobalLoader />
            ): (
                <div className="h-full overflow-y-auto">
                    <div className="flex flex-col gap-3">
                        {recent.map((emprunt, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="w-full flex flex-row justify-between bg-gray-100 dark:bg-gray-600 px-4 py-3 rounded-xl">
                                    <div className="flex flex-row items-start gap-4">
                                        <div className="px-3 py-5 bg-gray-300 dark:bg-gray-400 rounded-lg">
                                            <FaRegEnvelope className="w-8 h-8 dark:text-gray-200"/>
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-semibold dark:text-white">{emprunt.utilisateur.prenom}</h1>
                                            <p>{emprunt.equipement.nom}</p>
                                            <p><span className="font-semibold">Marque: </span>{emprunt.equipement.marque}</p>
                                            {openDetails[emprunt.id] && (
                                                <>
                                                    <p><span className="font-semibold">Date de retour prévue: </span>{new Date(emprunt.dateRetourPrevu).toLocaleDateString()}</p>
                                                    <p><span className="font-semibold">Numéro de série: </span>{emprunt.equipement.numeroDeSerie}</p>
                                                    <p><span className="font-semibold">Usage: </span>{emprunt.usage}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="my-4">
                                        <button
                                            onClick={() => toggleDetails(emprunt.id)}
                                            className="p-2 bg-slate-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition-transform"
                                        >
                                            <FiChevronDown 
                                                className={`w-6 h-6 transition-transform ${openDetails[emprunt.id] ? 'rotate-90' : 'rotate-0'}`} 
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}