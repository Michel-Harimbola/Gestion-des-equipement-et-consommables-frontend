import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipements, createEquipement, deleteEquipement, updateEquipement } from "../../../redux/slices/admin/EquipementSlice";
import EquipementForm from "./equipementForm";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
export default function Equipement() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.equipements);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEquipement, setSelectedEquipement] = useState(null);

    useEffect(() => {
      dispatch(fetchEquipements());
    }, [dispatch]);

    const handleAdd = () => {
      setSelectedEquipement(null);
      setIsModalOpen(true);
    };

    const handleEdit = (equipement) => {
      setSelectedEquipement(equipement);
      setIsModalOpen(true);
    };

    const handleDelete = (id) => {
      if (window.confirm("Voulez-vous vraiment supprimer cet équipement ?")) {
        dispatch(deleteEquipement(id));
      }
    };

    const handleSubmit = (formData) => {
      if (selectedEquipement) {
        dispatch(updateEquipement({ id: selectedEquipement.id, data: formData }));
      } else {
        dispatch(createEquipement(formData));
      }
      setIsModalOpen(false);
    };

    return (
        <div className="h-screen dark:bg-gray-800 pt-22 pl-74 pr-10">
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
                        <th className="py-3 px-4 text-left">Type</th>
                        <th className="py-3 px-4 text-left">Etat</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((equipement, index) => (
                        <tr 
                            key={equipement.id} 
                            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:even:bg-gray-700 dark:odd:bg-gray-800 dark:text-white transition-colors"
                        >
                            <td className="py-2 px-4 font-medium">{index + 1}</td>
                            <td className="py-2 px-4">
                              {equipement.nom}
                            </td>
                            <td className="py-2 px-4">
                              {equipement.type}
                            </td>
                            <td className="py-2 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-lg font-semibold ${
                                  equipement.etat === "Disponible"
                                  ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {equipement.etat}
                              </span>
                            </td>
                            <td className="p-2 space-x-8 flex">
                                <button onClick={() => handleEdit(equipement)} className="text-xl hover:text-white">
                                   <GrUpdate />
                                </button>
                                <button onClick={() => handleDelete(equipement.id)} className="text-red-500 text-2xl hover:text-white">
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
                <EquipementForm
                  onSubmit={handleSubmit}
                  onClose={() => setIsModalOpen(false)}
                  initialData={selectedEquipement}
                  items={items}
                />
            )}
        </div>
    );
}