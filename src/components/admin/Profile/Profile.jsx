import DonutChart from "./DonutChart";
import Notification from "./Notifications";
import User from "./User";



export default function Profile() {
    return (
        <div className="px-2 py-4  bg-gray-200 rounded-lg w-full dark:bg-gray-800 lg:w-60 xl:w-80 flex flex-col justify-between gap-6">
            <User />
            <Notification />
            <DonutChart />
        </div>
    )
}