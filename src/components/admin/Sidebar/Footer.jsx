import { IoIosLogOut } from "react-icons/io"
import { FaUserCircle } from "react-icons/fa"
import { logout } from "../../../redux/slices/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUser } from "../../../redux/slices/admin/UserSlice"
import { useEffect } from "react"


export default function Footer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.users); 

    useEffect(() => {
        if(!currentUser) {
            dispatch(getUser(0))
        }
    }, [dispatch, currentUser]);

    const toggleLogout = () => {
        dispatch(logout());
        navigate("/Login");
    }

    return (
        <div className="flex flex-row justify-between items-center mb-3 bg-gray-100 dark:text-white dark:bg-gray-800 py-3 px-4 mx-3 rounded-2xl">
            <button 
                onClick={toggleLogout}
                className="p-3 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full hover:bg-gray-300 cursor-pointer">
                <IoIosLogOut className="w-8 h-8"/>
            </button>
            <div className="flex flex-row items-center gap-2">
                <div className="text-sm font-semibold">
                    <div className="text-end">
                        {currentUser == "admin" ? (
                            <p>Admin</p>
                        ) : (
                            <p>Régisseur</p>
                        )
                        }
                    </div>
                    <p className="text-end">{currentUser?.prenom}</p>
                </div>
                <FaUserCircle className="w-12 h-12"/>
            </div>
        </div>
    )
}