import { useSelector } from "react-redux";

export default function NotificationList() {
  const notifications = useSelector((state) => state.notifications.list);

  return (
    <div className="">
      {notifications.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-sm">Aucune notification</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="rounded-md"
            >
              <p className="text-sm dark:text-gray-200">{notif.message}</p>
              <span className="text-xs dark:text-gray-300">
                {new Date(notif.DateEnvoi).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
