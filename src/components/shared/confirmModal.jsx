import { FiX } from "react-icons/fi";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold dark:text-white">{title}</h2>
          <button onClick={onCancel}>
            <FiX className="text-gray-600 dark:text-gray-300 text-2xl cursor-pointer" />
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Annuler
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-fuchsia text-white hover:bg-red-600"
          >
            Confirmer
          </button>
        </div>

      </div>
    </div>
  );
}
