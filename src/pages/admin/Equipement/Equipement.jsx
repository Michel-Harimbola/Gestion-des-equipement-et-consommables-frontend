import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchEquipements, 
  createEquipement, 
  fetchSearchEquipements,
  setQuery, 
  setPage, 
  deleteEquipement, 
  updateEquipement } from "../../../redux/slices/admin/EquipementSlice";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiSearch, FiX } from "react-icons/fi";
import { MoreVertical, Trash2, Edit2, Filter, Square, SquareCheckBig } from "lucide-react";
import ConfirmModal from "../../../components/shared/confirmModal";
import EquipementForm from "./equipementForm";
import { useTranslation } from "react-i18next";


export default function Equipement() {
  const dispatch = useDispatch();
  const { items, loading, page, totalPages, query, limit: stateLimit } = useSelector((state) => state.equipements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipement, setSelectedEquipement] = useState(null);
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
        dispatch(fetchSearchEquipements({ q: query.trim(), page, limit: stateLimit }));
      } else {
        dispatch(fetchEquipements({ page, limit: stateLimit }));
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
    setSelectedEquipement(null);
    setIsModalOpen(true);
  };

  const handleEdit = (equipement) => {
    setSelectedEquipement(equipement);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteEquipement(deleteId));
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = (formData) => {
    if (selectedEquipement) {
      dispatch(updateEquipement({ id: selectedEquipement.id, data: formData }));
    } else {
      dispatch(createEquipement(formData));
    }
    setIsModalOpen(false);
  };

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  }

  const FilterEquipement = items.filter((equipement) => {
    if (isActive === "all") return true;
    return equipement.disponibilite === isActive;
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
      <div className="h-screen dark:bg-gray-900 pt-22 sm:pl-74 sm:pr-10 px-4">
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
                  <h1>Disponibilité</h1>
                </div>

                {openFilter ? (
                  <FiChevronUp className="size-6" />
                ):(
                  <FiChevronDown className="size-6" />
                )}
              </button>

              {openFilter && (
                <div className="absolute bg-white dark:bg-gray-900 dark:text-white w-full border border-gray-500 border-t-0 border-b-0">
                  {["all", "Disponible", "Emprunte", "EnMaintenance"].map((val) => (
                    <div 
                      key={val}
                      className="border-b border-gray-500"
                    >
                      <div className="flex gap-4 px-4 py-2 hover:bg-gray-50 hover:dark:bg-gray-800">
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
                          : val === "Emprunte"
                          ? t("borrowed")
                          : val === "EnMaintenance"
                          ? t("maintenance")
                          : t("availableStatus")
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

        <div className="lg:block hidden overflow-x-auto rounded-lg">
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <table className="min-w-full text-lg text-gray-700">
              <thead className="bg-fuchsia text-white">
                <tr>
                  <th className="py-3 px-4 text-left">{t("photo")}</th>
                  <th className="py-3 px-4 text-left">{t("name")}</th>
                  <th className="py-3 px-4 text-left">{t("serialNumber")}</th>
                  <th className="py-3 px-4 text-left">{t("brand")}</th>
                  <th className="py-3 px-4 text-left">{t("availability")}</th>
                  <th className="py-3 px-4 text-left">{t("equipmentCondition")}</th>
                  <th className="py-3 px-4 text-left">{t("acquisition")}</th>
                  <th className="py-3 px-4 text-left">{t("supplier")}</th>
                  <th className="py-3 px-4 text-left">{t("donor")}</th>
                  <th className="py-3 px-4 text-left">{t("price")}</th>
                  <th className="py-3 px-4 text-left">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {FilterEquipement.map((equipement, index) => (
                  <tr 
                      key={equipement.id} 
                      className=" even:bg-white odd:bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:even:bg-gray-800 dark:odd:bg-gray-900 dark:text-white transition-colors"
                  >
                      <td className="p-2">
                        {equipement.photo ? (
                          <img
                            src={`http://localhost:3001${equipement.photo}`}
                            alt={equipement.nom}
                            className="w-16 h-10 object-cover rounded-xl"
                          />
                        ) : (
                          <span>{t("noPhoto")}</span>
                        )}
                      </td>
                      <td className="py-2 px-4">{equipement.nom}</td>
                      <td className="py-2 px-4">{equipement.numeroDeSerie}</td>
                      <td className="py-2 px-4">{equipement.marque}</td>
                      <td className="py-2 px-4 flex">
                        {equipement.disponibilite === "Emprunte"? (
                          <p className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-lg font-semibold">
                            {t("borrowed")}
                          </p>
                        ):equipement.disponibilite === "EnMaintenance"? (
                          <p className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-lg font-semibold">
                            {t("maintenance")}
                          </p>
                        ):(
                          <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                            {t("availableStatus")}
                          </p>
                        )}
                      </td>
                      <td className="py-2 px-4">{equipement.etatMateriel}</td>
                      <td className="py-2 px-4">{equipement.obtention}</td>
                      <td className="py-2 px-4">{equipement.fournisseur}</td>
                      <td className="py-2 px-4">{equipement.donateur}</td>
                      <td className="py-2 px-4">{equipement.prix}</td>
                      <td className="py-4  space-x-8 flex">
                          <button onClick={() => handleEdit(equipement)} className="text-xl hover:text-white">
                              <Edit2 />
                          </button>
                          <button onClick={() => handleDelete(equipement.id)} className="text-red-500 text-2xl hover:text-white">
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
        <div className="grid grid-cols-1 gap-4 md:hidden dark:text-white">
          {FilterEquipement.map((equipement, index) => (
            <div
              key={equipement.id}
              className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between mb-2">
                <div className="text-2xl font-semibold">
                  {equipement.nom}
                </div>

                <div className="flex gap-5">
                  <p>N° {equipement.numeroDeSerie}</p>

                  <div 
                    className="relative" 
                    ref={openMenuId === equipement.id ? menuRef : null}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(
                          openMenuId === equipement.id ? null : equipement.id
                        );
                      }}
                      className="-mt-2 -mr-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-2">
                        <MoreVertical />  
                    </button>

                    {openMenuId === equipement.id  && (
                      <div className="absolute right-7 -top-1 bg-gray-50 dark:bg-gray-600 rounded-xl">
                        <button
                          onClick={() => {
                            setOpenMenuId(null); 
                            handleEdit(equipement);
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
                <span className="font-medium">Marque : </span>
                {equipement.marque}
              </p>
              <p>
                <span className="font-medium">Etat : </span>
                {equipement.etatMateriel}
              </p>
              <p>
                <span className="font-medium">Obtention : </span>
                {equipement.obtention}
              </p>
              {equipement.fournisseur === "" ?(
                <p>
                  <span className="font-medium">Donateur : </span>
                  {equipement.donateur}
                </p> 
              ):(
                <p>
                  <span className="font-medium">Fournisseur : </span>
                  {equipement.fournisseur}
                </p> 
              )
                
              }
              <div className="flex justify-between items-center -mt-1"> 
                <p>
                  <span className="font-medium">Prix : </span>
                  {equipement.prix} ar
                </p>  

                <div className="">
                  {equipement.disponibilite === "Emprunte"? (
                    <p className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-lg font-semibold">
                      Emprunté
                    </p>
                  ):equipement.disponibilite === "EnMaintenance"? (
                    <p className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-lg font-semibold">
                      En maintenance
                    </p>
                  ):(
                    <p className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold">
                      Disponible
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
            <EquipementForm
              onSubmit={handleSubmit}
              onClose={() => setIsModalOpen(false)}
              initialData={selectedEquipement}
              items={items}
            />
        )}

        <ConfirmModal
          isOpen={isConfirmOpen}
          title="Confirmation"
          message="Voulez-vous vraiment supprimer cet équipement ?"
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmOpen(false)}
        />
    </div>
  );
}