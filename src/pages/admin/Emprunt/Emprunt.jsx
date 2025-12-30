import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchEmprunts, fetchSearchEmprunt, setQuery, setPage, createEmprunt, deleteEmprunt, updateEmprunt } from "../../../redux/slices/admin/EmpruntSlice";
import { MoreVertical, Trash2, Edit2, Filter, Square, SquareCheckBig } from "lucide-react";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiSearch, FiX } from "react-icons/fi";
import ConfirmModal from "../../../components/shared/confirmModal";
import EmpruntForm from "./empruntForm";


export default function Emprunt() {
  const dispatch = useDispatch();
  const { items, loading, page, totalPages, query, limit: stateLimit } = useSelector((state) => state.emprunts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmprunt, setSelectedEmprunt] = useState(null);
  const [openMenuEmpruntId, setOpenMenuEmpruntId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isActive, setIsActive] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  const menuRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    const delay = 400;
    const timer = setTimeout(() => {
      if (query && query.trim() !== "") {
        dispatch(fetchSearchEmprunt({ q: query.trim(), page, limit: stateLimit }));
      } else {
        dispatch(fetchEmprunts({ page, limit: stateLimit }));
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
    setSelectedEmprunt(null);
    setIsModalOpen(true);
  };

  const handleEdit = (emprunt) => {
    setSelectedEmprunt(emprunt);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteEmprunt(deleteId));
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = (formData) => {
    if (selectedEmprunt) {
      dispatch(updateEmprunt({ id: selectedEmprunt.id, data: formData }));
    } else {
      dispatch(createEmprunt(formData));
    }
    setIsModalOpen(false);
  };

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  }

  const FilterEmprunt = items.filter((emprunt) => {
    if (isActive === "all") return true;
    return emprunt.statut === isActive;
  })

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuEmpruntId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isConfirmOpen || isModalOpen) {
      setOpenMenuEmpruntId(null);
    }
  }, [isConfirmOpen, isModalOpen]);

  return (
    <div className="h-screen dark:bg-gray-900 pt-22 lg:pl-74 lg:pr-10 px-4">
        <div className="flex justify-between mb-5">
          <div className="flex items-center gap-10">

            {/* Recherche */}
            <div className="relative">
                        
              <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />

              <input
                type="text"
                value={query}
                onChange={(e) =>{ 
                  dispatch(setQuery(e.target.value));
                  dispatch(setPage(1));
                }}
                placeholder={t("research")}
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

            {/* Filtre */}
            <div className="relative">
              <button 
                onClick={toggleFilter}
                className="
                  flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-500 dark:border-gray-400 
                  dark:text-gray-400 px-4 py-2 w-[240px] cursor-pointer
                "
              >
                <div className="flex gap-4">
                  <Filter className="size-5" />
                  <h1>Statut</h1>
                </div>
                {openFilter ? (
                  <FiChevronUp className="size-6 ml-20" />
                ):(
                  <FiChevronDown className="size-6 ml-20" />
                )}
              </button>
  
              {openFilter && (
                <div className="absolute bg-white dark:bg-gray-900 dark:text-white w-full border border-gray-500 border-t-0 border-b-0">
                  {["all", "EnCours", "EnRetard", "Retourner"].map((val) => (
                    <div 
                      key={val}
                      className="border-b border-gray-500"
                    >
                      <div className="flex gap-4 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <button 
                          onClick={() => setIsActive(val)}
                          className="cursor-pointer"
                        >
                          {isActive === val ? (
                            <SquareCheckBig className="text-fuchsia" />               
                          ):(
                            <Square className="opacity-50" />                              
                          )}
                        </button>
                        <span className="cursor-default">
                          { val === "all" 
                          ? t("all")
                          : val === "EnCours"
                          ? t("inProgress")
                          : val === "EnRetard" 
                          ? t("late")
                          : t("return")
                          }
                        </span>
                      </div>
                  </div>
                  ))}
                </div>
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
                  <th className="py-3 px-4 text-left">{t("firstName")}</th>
                  <th className="py-3 px-4 text-left">{t("equipments")}</th>
                  <th className="py-3 px-4 text-left">{t("brand")}</th>
                  <th className="py-3 px-4 text-left">N° </th>
                  <th className="py-3 px-4 text-left">{t("status")}</th>
                  <th className="py-3 px-4 text-left">{t("borrowDate")}</th>
                  <th className="py-3 px-4 text-left">{t("expectedReturnDate")}</th>
                  <th className="py-3 px-4 text-left">{t("actualReturnDate")}</th>
                  <th className="py-3 px-4 text-left">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {FilterEmprunt.map((emprunt) => (
                  <tr 
                      key={emprunt.id} 
                      className="even:bg-white odd:bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                  >
                    <td className="p-2">
                      {emprunt.equipement.photo ? (
                        <img
                          src={`http://localhost:3001${emprunt.equipement.photo}`}
                          alt={emprunt.equipement.nom}
                          className="w-16 h-10 object-cover rounded-lg"
                        />
                      ):(
                        <span>{t("noPhoto")}</span>
                      )}
                    </td>
                    <td className="py-2 px-4 font-medium">{emprunt.utilisateur.prenom}</td>
                    <td className="py-2 px-4">{emprunt.equipement.nom}</td>
                    <td className="py-2 px-4">{emprunt.equipement.marque}</td>
                    <td className="py-2 px-4">{emprunt.equipement.numeroDeSerie}</td>
                    <td className="py-2 px-4 -ml-4 flex">
                      {emprunt.statut === "EnCours"? (
                        <p className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-lg font-semibold">
                          {t("inProgress")}
                        </p>
                      ):emprunt.statut === "EnRetard"?(
                        <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                          {t("late")}
                        </p>
                      ):(
                        <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                          {t("return")}
                        </p>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(emprunt.dateEmprunt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(emprunt.dateRetourPrevu).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {emprunt.dateRetourEffective == null ? "pas encore" : new Date(emprunt.dateRetourEffective).toLocaleDateString()}
                    </td>
                    <td className="p-4 space-x-8 flex">
                      <button onClick={() => handleEdit(emprunt)} className="text-xl hover:text-white">
                          <Edit2 />
                      </button>
                      <button  onClick={() => handleDelete(emprunt.id)} className="text-red-500 text-2xl hover:text-white">
                          <Trash2 />
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
          {FilterEmprunt.map((emprunt) => (
            <div
              key={emprunt.id}
              className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between -mb-2">
                <p>
                  <span className="font-medium">{t("name")}: </span>
                  {emprunt.utilisateur.nom}
                </p>
                <div className="flex gap-5">
                  <p>N° {emprunt.equipement.numeroDeSerie}</p>

                  <div 
                    className="relative" 
                    ref={openMenuEmpruntId === emprunt.id ? menuRef : null}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuEmpruntId(
                          openMenuEmpruntId === emprunt.id ? null : emprunt.id
                        );
                      }}
                      className="-mt-2 -mr-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-2">
                        <MoreVertical />  
                    </button>

                    {openMenuEmpruntId === emprunt.id  && (
                      <div className="absolute right-7 -top-1 bg-gray-50 dark:bg-gray-600 rounded-xl">
                        <button
                          onClick={() => {
                            setOpenMenuEmpruntId(null); 
                            handleEdit(emprunt);
                          }}
                          className="flex items-center gap-3 w-full py-2 px-4 mr-6 text-left hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-gray-200 rounded-xl"
                        >
                          <Edit2 />
                          {t("edit")}
                        </button>
                        
                        <button
                          onClick={() => {
                            setOpenMenuEmpruntId(null);
                            setIsConfirmOpen(true);
                          }}
                          className="flex items-center gap-3 w-full py-2 px-4 text-left text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-red-50 rounded-xl"
                        >
                          <Trash2 />
                          {t("delete")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p>
                <span className="font-medium">{t("firstName")}: </span>
                {emprunt.utilisateur.prenom}
              </p>
              <p>
                <span className="font-medium">Equipement: </span>
                {emprunt.equipement.nom}
              </p>
              <p>
                <span className="font-medium">{t("brand")}: </span>
                {emprunt.equipement.marque}
              </p>
              <p>
                <span className="font-medium">{t("borrowDate")}: </span>
                {new Date(emprunt.dateEmprunt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">{t("expectedReturnDate")}: </span>
                {new Date(emprunt.dateRetourPrevu).toLocaleDateString()}
              </p>
              <div className="flex justify-between">
                <p>
                  <span className="font-medium">{t("actualReturnDate")}: </span>
                  {emprunt.dateRetourEffective == null ? "pas encore" : new Date(emprunt.dateRetourEffective).toLocaleDateString()}
                </p>
                <div className="-mt-4">
                  {emprunt.statut === "EnCours"? (
                    <p className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-lg font-semibold">
                      {t("inProgress")}
                    </p>
                  ):emprunt.statut === "EnRetard"?(
                    <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                      {t("late")}
                    </p>
                  ):(
                    <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                      {t("return")}
                    </p>
                  )}
                </div>
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
            <EmpruntForm
              onSubmit={handleSubmit}
              onClose={() => setIsModalOpen(false)}
              initialData={selectedEmprunt}
              items={items}
            />
        )}

        <ConfirmModal
          isOpen={isConfirmOpen}
          title="Confirmation"
          message="Voulez-vous vraiment supprimer cet emprunt ?"
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmOpen(false)}
        />
    </div>
  );
}