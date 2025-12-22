import { X } from "lucide-react";
import { AlertOctagon, AlertTriangle } from "lucide-react";


export default function Notification({ notifications, onClose }) {
  return (
    <div className="absolute right-4 top-16 w-[450px] bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-300 dark:border-gray-600 z-50">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold dark:text-white">Notifications</h2>
        <button onClick={onClose} className="text-gray-600 dark:text-gray-300 cursor-pointer">
          <X size={20} />
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
          Aucune notification
        </p>
      ):(
        <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {notifications.map((notif) => (           
            <li 
              key={notif.id} 
              className={`p-3 rounded-lg flex gap-3 items-center hover:bg-gray-100 dark:hover:bg-gray-600
              ${notif.vu ? "bg-gray-50 dark:bg-gray-700" : "bg-blue-100 dark:bg-blue-900"}`}
            >
              {notif.type == "AlerteStock" ? (
                  <AlertOctagon className="w-8 h-8 text-red-500" />
                ):(
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
              )}
              <div>
                <p className="text-sm dark:text-white">{notif.message}</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">
                  {new Date(notif.DateEnvoi).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
