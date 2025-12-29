import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchDemandes, 
  fetchSearchDemandeEmprunt, 
  setQuery, 
  setPage, 
  deleteDemande, 
  updateDemande } from "../../../redux/slices/admin/DemandeEmpruntSlice";
import { FiChevronLeft, FiChevronRight, FiSearch, FiX } from "react-icons/fi";
import { MoreVertical, Trash2, Edit2 } from "lucide-react";
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
    <div className="h-screen dark:bg-gray-900 pt-24 lg:pl-74 lg:pr-10 px-4">
      <div className="mb-5">
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

      {/* Ordi */}
      <div className="md:block hidden overflow-x-auto rounded-lg">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="min-w-full text-lg text-gray-700">
            <thead className="bg-fuchsia text-white">
              <tr>
                <th className="py-3 px-4 text-left">Photo</th>
                <th className="py-3 px-4 text-left">Prénom</th>
                <th className="py-3 px-4 text-left">N° série</th>
                <th className="py-3 px-4 text-left">Équipements</th>
                <th className="py-3 px-4 text-left">Marque</th>
                <th className="py-3 px-4 text-left">Statut</th>
                <th className="py-3 px-4 text-left">Date de demande</th>
                <th className="py-3 px-4 text-left">Date de retour prévu</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((demande, index) => (
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
                        <span>Aucune photo</span>
                      )}
                    </td>
                    <td className="py-2 px-4 font-medium">{demande.utilisateur.prenom}</td>
                    <td className="py-2 px-4">{demande.equipement.numeroDeSerie}</td>
                    <td className="py-2 px-4">{demande.equipement.nom}</td>
                    <td className="py-2 px-4">{demande.equipement.marque}</td>
                    <td className="py-2 px-4 -ml-4 flex">
                      {demande.statut === "refuser"? (
                        <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                          Refuser
                        </p>
                      ):(
                        <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                          Approuver
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
        {items.map((demande, index) => (
          <div
            key={demande.id}
            className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
          >
            <div className="flex justify-between -mb-2">
              <p>
                <span className="font-medium">Nom: </span>
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
                        Modifier
                      </button>
                      
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          setIsConfirmOpen(true);
                        }}
                        className="flex items-center gap-3 w-full py-2 px-4 text-left text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-red-50 rounded-xl"
                      >
                        <Trash2 />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p>
              <span className="font-medium">Prénom: </span>
              {demande.utilisateur.prenom}
            </p>
            <p>
              <span className="font-medium">Equipement: </span>
              {demande.equipement.nom}
            </p>
            <p>
              <span className="font-medium">Marque: </span>
              {demande.equipement.marque}
            </p>
            <p>
              <span className="font-medium">Date de demande: </span>
              {new Date(demande.dateDemande).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Date de retour prévu: </span>
              {new Date(demande.dateRetourPrevu).toLocaleDateString()}
            </p>
            <div className="flex justify-between">
              <p>
                <span className="font-medium">Type: </span>
                {demande.type}
              </p>
              <div className="-mt-4">
                {demande.statut === "refuser"? (
                  <p className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-lg font-semibold">
                    Refuser
                  </p>
                ):(
                  <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                    Approuver
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