import { useSelector } from "react-redux";

export default function NotificationList() {
  const notifications = useSelector((state) => state.notifications.list);

  return (
    <div className="">
      {notifications.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-sm">Aucune notification</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="p-2 rounded-md"
            >
              <p className="text-sm">{notif.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(notif.DateEnvoi).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
