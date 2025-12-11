import {
  FaChartBar,
  FaUsers,
  FaHandHolding,
  FaBoxOpen,
  FaTools,
  FaCogs,
  FaListAlt
} from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";


export const links = [
  {
    href: "/AdminDashboard",
    icon: FaChartBar,
    text: "Dashboard",
  },
  {
    href: "/User",
    icon: FaUsers,
    text: "Utilisateurs",
  },
  {
    href: "/Emprunt",
    icon: FaHandHolding,
    text: "Emprunts",
    badge: {
      text: "Pro",
      color: "bg-gray-100 text-gray-800",
      darkColor: "dark:bg-gray-700 dark:text-gray-300",
    },
  },
  {
    href: "/Consommable",
    icon: FaBoxOpen,
    text: "Consommables",
    badge: {
      text: "4",
      color: "bg-blue-100 text-blue-800",
      darkColor: "dark:bg-blue-900 dark:text-blue-300",
    },
  },
  {
    href: "/Equipement",
    icon: FaTools,
    text: "Equipements",
  },
  {
    href: "/Demande",
    icon: LuClipboardList,
    text: "Demandes",
  },
  {
    href: "/Utilisation",
    icon: FaCogs,
    text: "UtilisationCons",
  },
  {
    href: "/Rapport",
    icon: FaListAlt,
    text: "Rapport",
  },
];



