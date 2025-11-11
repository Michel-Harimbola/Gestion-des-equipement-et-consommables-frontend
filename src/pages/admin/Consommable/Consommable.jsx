import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsommables, createConsommable, deleteConsommable, updateConsommable } from "../../../redux/slices/admin/ConsommableSlice";
import ConsommableForm from "./consommableForm";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";


export default function Consommable() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.consommables);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConsommable, setSelectedConsommable] = useState(null);

    useEffect(() => {
      dispatch(fetchConsommables());
    }, [dispatch]);

    const handleAdd = () => {
      setSelectedConsommable(null);
      setIsModalOpen(true);
    };

    const handleEdit = (consommable) => {
      setSelectedConsommable(consommable);
      setIsModalOpen(true);
    };

    const handleDelete = (id) => {
      if (window.confirm("Voulez-vous vraiment supprimer cet consommable ?")) {
        dispatch(deleteConsommable(id));
      }
    };

    const handleSubmit = (formData) => {
      if (selectedConsommable) {
        dispatch(updateConsommable({ id: selectedConsommable.id, data: formData }));
      } else {
        dispatch(createConsommable(formData));
      }
      setIsModalOpen(false);
    };

    return (
        <div className="h-screen dark:bg-gray-900 pt-22 pl-74 pr-10">
            <div className="flex justify-end">
                <button
                    onClick={handleAdd}
                    className=" gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md"       
                >
                    Ajouter <span className="text-2xl font-bold">+</span>
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg mt-10">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-sky-500 dark:bg-blue-900 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Nom</th>
                        <th className="py-3 px-4 text-left">Quantité</th>
                        <th className="py-3 px-4 text-left">Seuil Critique</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((consommable, index) => (
                        <tr 
                            key={consommable.id} 
                            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:even:bg-gray-700 dark:odd:bg-gray-800 dark:text-white transition-colors"
                        >
                            <td className="py-2 px-4 font-medium">{index + 1}</td>
                            <td className="py-2 px-4">{consommable.nom}</td>
                            <td className="py-2 px-4">{consommable.quantiteDisponible}</td>
                            <td className="py-2 px-4">{consommable.seuilCritique}</td>
                            <td className="p-2 space-x-8 flex">
                                <button onClick={() => handleEdit(consommable)} className="text-xl hover:text-white">
                                   <GrUpdate />
                                </button>
                                <button onClick={() => handleDelete(consommable.id)} className="text-red-500 text-2xl hover:text-white">
                                   <FiDelete />
                                </button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>

            {isModalOpen && (
                <ConsommableForm
                  onSubmit={handleSubmit}
                  onClose={() => setIsModalOpen(false)}
                  initialData={selectedConsommable}
                  items={items}
                />
            )}
        </div>
    );
}