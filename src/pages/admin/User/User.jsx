import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchSearchUser, setQuery, setPage, createUser, deleteUser, updateUser } from "../../../redux/slices/admin/UserSlice";
import ConfirmModal from "../../../components/shared/confirmModal";
import UserForm from "./userForm";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight, FiSearch, FiX, FiDelete } from "react-icons/fi";
import { MoreVertical } from "lucide-react";
import { GrUpdate } from "react-icons/gr";


export default function User() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages, query, limit: stateLimit } = useSelector((state) => state.users);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [openMenuUserId, setOpenMenuUserId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const menuRef = useRef(null);

    const { t } = useTranslation();

    useEffect(() => {
      const delay = 400;
      const timer = setTimeout(() => {
        if (query && query.trim() !== "") {
          dispatch(fetchSearchUser({ q: query.trim(), page, limit: stateLimit }));
        } else {
          dispatch(fetchUsers({ page, limit: stateLimit }));
        }
      }, delay);
  
      return () => clearTimeout(timer);
    }, [dispatch, query, page, stateLimit]);

    const handlePrev = () => {
      if (page > 1) dispatch(setPage(page - 1));
    };
  
    const handleNext = () => {
      if (page < totalPages) dispatch(setPage(page + 1));
    };

    const handleAdd = () => {
      setSelectedUser(null);
      setIsModalOpen(true);
    };

    const handleEdit = (user) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    };

    const handleDelete = (id) => {
      setDeleteId(id);
      setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
      dispatch(deleteUser(deleteId));
      setIsConfirmOpen(false);
      setDeleteId(null);
    };

    const handleSubmit = (formData) => {
      if (selectedUser) {
        dispatch(updateUser({ id: selectedUser.id, data: formData }));
      } else {
        dispatch(createUser(formData));
      }
      setIsModalOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setOpenMenuUserId(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (isConfirmOpen || isModalOpen) {
        setOpenMenuUserId(null);
      }
    }, [isConfirmOpen, isModalOpen]);

    return (
      <div className="h-screen dark:bg-gray-900 pt-22 lg:pl-74 lg:pr-10 px-4">
            <div className="flex justify-between items-center mb-5">
              <div className="mt-2">
                <div className="relative">
                            
                  <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />

                  <input
                    type="text"
                    value={query}
                    onChange={(e) =>{ 
                      dispatch(setQuery(e.target.value));
                      dispatch(setPage(1));
                    }}
                    placeholder="Rechercher"
                    className="pl-10 pr-9 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />

                  {query && (
                    <button
                      onClick={() => {
                        dispatch(setQuery(""));
                        dispatch(setPage(1));
                      }}
                      className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={handleAdd}
                  className=" gap-2 px-4 py-2 border border-transparent text-lg font-semibold rounded-lg text-white
                  bg-fuchsia hover:bg-red-400  dark:bg-fuchsia focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 shadow-md"       
                >
                  {t("add")} <span className="text-2xl font-bold">+</span>
                </button>
              </div>
            </div>
            {/* Ordi */}
            <div className="md:block hidden overflow-x-auto rounded-lg">
                {loading ? (
                  <p>Chargement...</p>
                ) : (
                  <table className="min-w-full text-lg text-gray-700">
                    <thead className="bg-fuchsia text-white">
                      <tr>
                        <th className="py-3 px-4 text-left">{t("photo")}</th>
                        <th className="py-3 px-4 text-left">{t("name")}</th>
                        <th className="py-3 px-4 text-left">{t("firstName")}</th>
                        <th className="py-3 px-4 text-left">{t("email")}</th>
                        <th className="py-3 px-4 text-left">{t("role")}</th>
                        <th className="py-3 px-4 text-left">{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((user, index) => (
                        <tr 
                            key={user.id} 
                            className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 
                              dark:odd:bg-gray-900 dark:text-white transition-colors"
                        >
                          <td className="p-2">
                            {user.photo ? (
                              <img
                                src={`http://localhost:3000${user.photo}`}
                                alt={user.nom}
                                className="size-18 object-cover rounded-full"
                              />
                            ) : (
                              <span>{t("noPhoto")}</span>
                            )}
                          </td>
                          <td className="p-2">{user.nom}</td>
                          <td className="p-2">{user.prenom}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">
                            { user.role === "regisseurEquipementInterne"? (
                              <p>{t("equipmentManager")}</p>
                            ): user.role === "personnelInterne"? (
                              <p>{t("internalStaff")}</p>
                            ): user.role === "partenaire"?(
                              <p>{t("partner")}</p>
                            ):(
                              <p>{user.role}</p>
                            )}
                          </td>
                          <td className="p-4 space-x-8 flex">
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
            
            {/* Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden dark:text-white">
              {items.map((user, index) => (
                <div
                  key={user.id}
                  className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex justify-between" >
                    <p>
                      <span className="font-medium">Nom : </span>
                      {user.nom}
                    </p>
                    <div 
                      className="relative" 
                      ref={openMenuUserId === user.id ? menuRef : null}
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuUserId(
                            openMenuUserId === user.id ? null : user.id
                          );
                        }}
                        className="-mt-3 -mr-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-2">
                          <MoreVertical />  
                      </button>

                      {openMenuUserId === user.id  && (
                        <div className="absolute right-7 -top-1 bg-gray-50 dark:bg-gray-600 rounded-xl">
                          <button
                            onClick={() => {
                              setOpenMenuUserId(null); 
                              handleEdit(user);
                            }}
                            className="flex items-center gap-3 w-full py-2 px-4 mr-6 text-left hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-gray-200 rounded-xl"
                          >
                            <GrUpdate />
                            Modifier
                          </button>
                          
                          <button
                            onClick={() => {
                              setOpenMenuUserId(null);
                              setIsConfirmOpen(true);
                            }}
                            className="flex items-center gap-3 w-full py-2 px-4 text-left text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-500 
                              active:bg-red-50 rounded-xl"
                          >
                            <FiDelete />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p>
                    <span className="font-medium">Prénom : </span>
                    {user.prenom}
                  </p>
                  <p>
                    <span className="font-medium">Email: </span>
                    {user.email}
                  </p>
                  <div>
                    { user.role === "regisseurEquipementInterne"? (
                      <p>
                        <span className="font-medium">Rôle: </span>
                        Régisseur des équipements interne
                      </p>
                    ): user.role === "personnelInterne"? (
                      <p>
                        <span className="font-medium">Rôle: </span>
                        Personnel interne
                      </p>
                    ): (
                      <p>
                        <span className="font-medium">Rôle: </span>
                        {user.role}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            { totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-100 rounded disabled:opacity-40"
                >
                  <FiChevronLeft className="w-7 h-7" />
                </button>
                <span className="dark:text-gray-50 p-1">{page} / {totalPages}</span>
                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-100 rounded disabled:opacity-40"
                >
                  <FiChevronRight className="w-7 h-7" />
                </button>
              </div>
            )}

            {isModalOpen && (
                <UserForm
                  onSubmit={handleSubmit}
                  onClose={() => setIsModalOpen(false)}
                  initialData={selectedUser}
                />
            )}

            <ConfirmModal
              isOpen={isConfirmOpen}
              title="Confirmation"
              message="Voulez-vous vraiment supprimer cet utilisateur ?"
              onConfirm={confirmDelete}
              onCancel={() => setIsConfirmOpen(false)}
            />
      </div>
    );
}