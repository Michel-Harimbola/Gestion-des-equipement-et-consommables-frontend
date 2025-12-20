import { FaUserCircle } from "react-icons/fa"
import { useSelector } from "react-redux"


export default function User() {
    const { currentUser } = useSelector((state) => state.auth);

    return (
        <div className="flex gap-3 items-center bg-white p-3 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {currentUser?.photo ? (
                    <img
                        src={`http://localhost:3000${currentUser.photo}`}
                        alt={currentUser.nom}
                        className="w-18 h-18 object-cover rounded-full"
                    />
                ):(
                    <FaUserCircle className="w-14 h-14 dark:text-white"/>
                )}
            <div>
                <h3 className="font-semibold text-2xl">{currentUser?.prenom}</h3>
                <div>{currentUser?.role == "admin" ? (
                    <p>Admin</p>
                ): (
                    <p>Régisseur</p>
                )}</div>
            </div>
        </div>
    )
}