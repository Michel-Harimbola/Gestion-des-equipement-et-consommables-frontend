import { useSelector } from "react-redux";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const notifications = useSelector((state) => state.notifications.list);

  return (
    <div className="relative">
      <Bell size={27} className="dark:text-gray-400 text-gray-700" />
      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
          {notifications.length}
        </span>
      )}
    </div>
  );
}
