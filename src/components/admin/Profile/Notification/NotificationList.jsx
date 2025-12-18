import { useSelector } from "react-redux";
import { AlertOctagon, AlertTriangle } from "lucide-react";


export default function NotificationList() {
  const notifications = useSelector((state) => state.notificationsActif.list);

  return (
    <div>
      {notifications.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-sm">Aucune notification</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="rounded-xl bg-gray-50 dark:bg-gray-600 py-2 px-3"
            >
              <div className="flex items-center gap-2">
                {notif.type == "AlerteStock" ? (
                  <AlertOctagon className="w-8 h-8 text-red-500" />
                ):(
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                )}
                <div>
                  <p className="text- dark:text-gray-200">{notif.message}</p>
                  <span className="text-xs dark:text-gray-300">
                    {new Date(notif.DateEnvoi).toLocaleString()}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
}
