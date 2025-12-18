import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotfications, deleteNotfication, setPage } from "../../../redux/slices/admin/notificationsSlice";
import { FiChevronLeft, FiChevronRight, FiDelete } from "react-icons/fi";
import ConfirmModal from "../../../components/shared/confirmModal";
import { MoreVertical } from "lucide-react";


export default function Notification() {
    const dispatch = useDispatch();
    const { items, loading, page, totalPages } = useSelector((state) => state.notifications);

    const [openMenuId, setOpenMenuId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        dispatch(fetchNotfications({ page, limit: 13 }));
    }, [dispatch, page]);

    const handlePrev = () => {
      if (page > 1) dispatch(setPage(page - 1));
    };
  
    const handleNext = () => {
      if (page < totalPages) dispatch(setPage(page + 1));
    };

    const handleDelete = (id) => {
      setDeleteId(id);
      setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
      dispatch(deleteNotfication(deleteId));
      setIsConfirmOpen(false);
      setDeleteId(null);
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
    if (isConfirmOpen) {
      setOpenMenuId(null);
    }
  }, [isConfirmOpen]);

  return (
    <div className="h-screen dark:bg-gray-900 pt-22 lg:pl-74 lg:pr-10 px-4">
      {/* Ordi */}
        <div className="md:block hidden overflow-x-auto rounded-lg mt-32">
          {loading ? (
          <p>Chargement...</p>
          ) : (
          <table className="min-w-full text-lg text-gray-700">
              <thead className="bg-fuchsia text-white">
                  <tr>
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Message</th>
                      <th className="py-3 px-4 text-left">Date d'envoi</th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Vu</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
              </thead>
              <tbody>
                {items.map((notification, index) => (
                    <tr 
                        key={notification.id} 
                        className="even:bg-white odd:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:even:bg-gray-800 
                        dark:odd:bg-gray-900 dark:text-white transition-colors"
                    >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{notification.message}</td>
                    <td className="p-2">{new Date(notification.DateEnvoi).toLocaleDateString()}</td>
                    <td className="p-2">{notification.type}</td>
                    <td className="p-2">{notification.vu ? "Oui" : "Non"}</td>
                    <td className="p-2 space-x-8 flex">
                      <button onClick={() => handleDelete(notification.id)} className="text-red-500 text-2xl hover:text-white">
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
          {items.map((notification, index) => (
            <div
              key={notification.id}
              className="bg-white dark:bg-gray-700 rounded-xl p-4 dark:border dark:border-gray-500 dark:shadow-none shadow-[0_0_20px_1px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between" >
                <p>
                  <span className="font-medium">Nom : </span>
                  {notification.message}
                </p>
                <div 
                  className="relative" 
                  ref={openMenuId === notification.id ? menuRef : null}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === notification.id ? null : notification.id
                      );
                    }}
                    className="-mt-3 -mr-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-2">
                      <MoreVertical />  
                  </button>

                  {openMenuId === notification.id  && (
                    <div className="absolute right-7 -top-1 bg-gray-50 dark:bg-gray-600 rounded-xl">
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          setIsConfirmOpen(true);
                        }}
                        className="flex items-center gap-3 w-full py-2 px-4 text-left text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-500 active:bg-red-50 rounded-xl"
                      >
                        <FiDelete />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p>
                <span className="font-medium">Date d'envoi : </span>
                {new Date(notification.DateEnvoi).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Type: </span>
                {notification.type}
              </p>
              <p>
                <span className="font-medium">Vu: </span>
                {notification.vu ? "Oui" : "Non"}
              </p>
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

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Confirmation"
        message="Voulez-vous vraiment supprimer cet notification ?"
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}