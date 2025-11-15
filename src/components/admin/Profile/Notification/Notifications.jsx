import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Title from "../../../../ui/Title";
import NotificationList from "./NotificationList";
import socket from"../../../../configs/socket";
import { fetchNotifications, addNotification } from "../../../../redux/slices/admin/notificationSlice";


export default function Notification() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotifications());

        // Écouter les notifications temps réel
        socket.on("stock_alert", (notification) => {
            dispatch(addNotification(notification));
        });

        // Nettoyer l'écouteur à la fermeture du composant
        return () => socket.off("stock_alert");
    }, [dispatch]);

    return (
        <div className="flex h-[312px] gap-4 flex-col bg-white rounded-lg px-3 py-5 dark:bg-gray-700">
            <Title>Notifications</Title>
            <div className="overflow-auto">
                <NotificationList />
            </div>

        </div>
    )
}