import { FaUserCircle } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUser } from "../../../redux/slices/admin/UserSlice"


export default function User() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.users);

    useEffect(() => {
        if(!currentUser) {
            dispatch(getUser(0))
        }
    }, [dispatch, currentUser]);
    return (
        <div className="flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-700 dark:text-gray-300">
            <FaUserCircle className="w-14 h-14 dark:text-white"/>
            <div>
                <h3 className="font-semibold text-2xl">{currentUser?.prenom}</h3>
                <div>{currentUser == "admin" ? (
                    <p>Admin</p>
                ): (
                    <p>Régisseur</p>
                )}</div>
            </div>
        </div>
    )
}