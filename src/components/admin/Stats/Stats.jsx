import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../../redux/slices/admin/dashboardSlice";
import { Users, ClipboardList, Package } from "lucide-react";
import Balance from "./Balance";
import Card from "./Card";

export default function Stats({ darkMode }) {
    const dispatch = useDispatch();

    const {
        totalUsers,
        empruntsEnCours,
        consommablesCritiques,
        loading,
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    if (loading) return <p>Chargement…</p>;

    const cardsData = [
        {
            title: "Total utilisateurs",
            count: totalUsers,
            icon: Users,
            bgColor: "bg-gray-100",
        },
        {
            title: "Emprunts en cours",
            count: empruntsEnCours,
            icon: ClipboardList,
            bgColor: "bg-blue-100",
        },
        {
            title: "Consommables critiques",
            count: consommablesCritiques,
            icon: Package,
            bgColor: "bg-red-100",
        },
    ];
    return (
        <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-4 h-full">
                {cardsData.map((item, i) => (
                    <Card key={i} data={item} />
                ))}
            </div>
            <Balance darkMode={darkMode} />
        </div>
    )
}