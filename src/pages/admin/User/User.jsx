import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, deleteUser, updateUser } from "../../../redux/slices/admin/UserSlice";
import UserForm from "./userForm";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";


export default function User() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.users);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);

    const handleAdd = () => {
      setSelectedUser(null);
      setIsModalOpen(true);
    };

    const handleEdit = (user) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    };

    const handleDelete = (id) => {
      if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        dispatch(deleteUser(id));
      }
    };

    const handleSubmit = (formData) => {
      if (selectedUser) {
        dispatch(updateUser({ id: selectedUser.id, data: formData }));
      } else {
        dispatch(createUser(formData));
      }
      setIsModalOpen(false);
    };

    return (
        <div className="ml-[300px] mr-8 mt-22 h-full ">
            <div className="flex justify-end">
                <button
                    onClick={handleAdd}
                    className=" gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                    bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 shadow-md"       
                >
                    Ajouter <span className="text-2xl font-bold">+</span>
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg mt-10">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-sky-500 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Nom</th>
                        <th className="py-3 px-4 text-left">Prénom</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Rôle</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((user, index) => (
                        <tr 
                            key={user.id} 
                            className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{user.nom}</td>
                          <td className="p-2">{user.prenom}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">{user.role}</td>
                          <td className="p-2 space-x-8 flex">
                            <button onClick={() => handleEdit(user)} className="text-xl hover:text-white">
                               <GrUpdate />
                            </button>
                            <button onClick={() => handleDelete(user.id)} className="text-red-500 text-2xl hover:text-white">
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
                <UserForm
                  onSubmit={handleSubmit}
                  onClose={() => setIsModalOpen(false)}
                  initialData={selectedUser}
                />
            )}
        </div>
    );
}