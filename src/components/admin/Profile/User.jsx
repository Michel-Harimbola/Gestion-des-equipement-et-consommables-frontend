import { FaUserCircle } from "react-icons/fa"


export default function User() {
    return (
        <div className="flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300">
            <FaUserCircle className="w-14 h-14 dark:text-white"/>
            <div>
                <h3 className="font-semibold text-2xl">Jhon Ddoe</h3>
                <p>Developer</p>
            </div>
        </div>
    )
}