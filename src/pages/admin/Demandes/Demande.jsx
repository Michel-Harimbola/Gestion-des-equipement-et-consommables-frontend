import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchDemandes, 
  fetchSearchDemandeEmprunt, 
  setQuery, 
  setPage, 
  deleteDemande, 
  updateDemande } from "../../../redux/slices/admin/DemandeEmpruntSlice";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiSearch, FiX } from "react-icons/fi";
import { MoreVertical, Trash2, Edit2, Filter, Square, SquareCheckBig } from "lucide-react";
import ConfirmModal from "../../../components/shared/confirmModal";
import { useTranslation } from "react-i18next";
import DemandeForm from "./demandeForm";


export default function Demande() {
  const dispatch = useDispatch();
  const { items, loading, page, totalPages, query, limit: stateLimit } = useSelector((state) => state.demandes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
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
        dispatch(fetchSearchDemandeEmprunt({ q: query.trim(), page, limit: stateLimit }));
      } else {
        dispatch(fetchDemandes({ page, limit: stateLimit }));
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

  const handleEdit = (demande) => {
    setSelectedDemande(demande);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteDemande(deleteId));
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = (formData) => {
    if (selectedDemande) {
      dispatch(updateDemande({ id: selectedDemande.id, data: formData }));
    }
    setIsModalOpen(false);
  };

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  }

  const FilterDemande = items.filter((demande) => {
    if (isActive === "all") return true;
    return demande.statut === isActive;
  })

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isConfirmOpen || isModalOpen) {
      setOpenMenuId(null);
    }
  }, [isConfirmOpen, isModalOpen]);

  return (
    <div className="h-screen dark:bg-gray-900 pt-23 lg:pl-74 lg:pr-10 px-4">
      <div className="flex items-center gap-10 mb-6">

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
              <h1>{t("status")}</h1>
            </div>

            {openFilter ? (
              <FiChevronUp className="size-6 ml-20" />
            ):(
              <FiChevronDown className="size-6 ml-20" />
            )}
          </button>

          {openFilter && (
            <div className="absolute bg-white dark:bg-gray-900 dark:text-white w-full border border-gray-500 border-t-0 border-b-0">
              {["all", "enAttente", "approuver", "refuser"].map((val) => (
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
                      {val === "enAttente" ? (
                        <p>{t("pending")}</p>
                      ): val === "approuver" ? (
                        <p>{t("approved")}</p>
                      ): val === "refuser" ? (
                        <p>{t("rejected")}</p>
                      ):(
                        <p>{t("all")}</p>
                      )}
                    </span>
                  </div>
              </div>
              ))}
            </div>
          )}
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
                <th className="py-3 px-4 text-left">N° </th>
                <th className="py-3 px-4 text-left">{t("equipments")}</th>
                <th className="py-3 px-4 text-left">{t("brand")}</th>
                <th className="py-3 px-4 text-left">{t("status")}</th>
                <th className="py-3 px-4 text-left">{t("borrowDate")}</th>
                <th className="py-3 px-4 text-left">{t("expectedReturnDate")}</th>
                <th className="py-3 px-4 text-left">{t("type")}</th>
                <th className="py-3 px-4 text-left">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {FilterDemande.map((demande, index) => (
                <tr 
                    key={demande.id} 
                    className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                >
                    <td className="p-2">
                      {demande.equipement.photo ? (
                        <img
                          src={`http://localhost:3001${demande.equipement.photo}`}
                          alt={demande.equipement.nom}
                          className="w-16 h-10 object-cover rounded-xl"
                        />
                      ) : (
                        <span>{t("noPhoto")}</span>
                      )}
                    </td>
                    <td className="py-2 px-4 font-medium">{demande.utilisateur.prenom}</td>
                    <td className="py-2 px-4">{demande.equipement.numeroDeSerie}</td>
                    <td className="py-2 px-4">{demande.equipement.nom}</td>
                    <td className="py-2 px-4">{demande.equipement.marque}</td>
                    <td className="py-2 px-4 -ml-4 flex">
                      {demande.statut === "refuser"? (
                        <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                          {t("reject")}
                        </p>
                      ):(
                        <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                          {t("approve")}
                        </p>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(demande.dateDemande).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(demande.dateRetourPrevu).toLocaleDateString()}
                    </td>
                      <td className="py-2 px-4">{demande.type}</td>
                    <td className="p-4 space-x-8 flex">
                      <button onClick={() => handleEdit(demande)} className="text-xl hover:text-white">
                          <Edit2 />
                      </button>
                      <button  onClick={() => handleDelete(demande.id)} className="text-red-500 text-2xl hover:text-white">
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
        {FilterDemande.map((demande) => (
          <div
            key={demande.id}
            className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
          >
            <div className="flex justify-between -mb-2">
              <p>
                <span className="font-medium">{t("name")}: </span>
                {demande.utilisateur.nom}
              </p>

              <div className="flex gap-5">
                <p>N° {demande.equipement.numeroDeSerie}</p>

                <div 
                  className="relative" 
                  ref={openMenuId === demande.id ? menuRef : null}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === demande.id ? null : demande.id
                      );
                    }}
                    className="-mt-2 -mr-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-2">
                      <MoreVertical />  
                  </button>

                  {openMenuId === demande.id  && (
                    <div className="absolute right-7 -top-1 bg-gray-50 dark:bg-gray-600 rounded-xl">
                      <button
                        onClick={() => {
                          setOpenMenuId(null); 
                          handleEdit(demande);
                        }}
                        className="flex items-center gap-3 w-full py-2 px-4 mr-6 text-left hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-gray-200 rounded-xl"
                      >
                        <Edit2 />
                        {t("edit")}
                      </button>
                      
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
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
              {demande.utilisateur.prenom}
            </p>
            <p>
              <span className="font-medium">{t("equipments")}: </span>
              {demande.equipement.nom}
            </p>
            <p>
              <span className="font-medium">{t("brand")}: </span>
              {demande.equipement.marque}
            </p>
            <p>
              <span className="font-medium">{t("borrowDate")}: </span>
              {new Date(demande.dateDemande).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">{t("expectedReturnDate")}: </span>
              {new Date(demande.dateRetourPrevu).toLocaleDateString()}
            </p>
            <div className="flex justify-between">
              <p>
                <span className="font-medium">{t("type")}: </span>
                {demande.type}
              </p>
              <div className="-mt-4">
                {demande.statut === "refuser"? (
                  <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                    {t("reject")}
                  </p>
                ):(
                  <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                    {t("approve")}
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
        <DemandeForm
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
          initialData={selectedDemande}
          items={items}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Confirmation"
        message="Voulez-vous vraiment supprimer cet demande ?"
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}