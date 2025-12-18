import {
  FaChartBar,
  FaUsers,
  FaHandHolding,
  FaBoxOpen,
  FaTools,
  FaCogs,
  FaListAlt,
  FaBell
} from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";


export const links = [
  {
    href: "/AdminDashboard",
    icon: FaChartBar,
    text: "Dashboard",
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    href: "/User",
    icon: FaUsers,
    text: "Utilisateurs",
    roles: ["admin"]
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
    roles: ["admin"]
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
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    href: "/Equipement",
    icon: FaTools,
    text: "Equipements",
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    href: "/Demande",
    icon: LuClipboardList,
    text: "Demandes",
    roles: ["admin"]
  },
  {
    href: "/Utilisation",
    icon: FaCogs,
    text: "Utilisation Consommable",
    roles: ["admin"]
  },
  {
    href: "/Notification",
    icon: FaBell,
    text: "Notification",
    roles: ["admin"]
  },
  {
    href: "/Rapport",
    icon: FaListAlt,
    text: "Rapport",
    roles: ["admin", "regisseurEquipementInterne"]
  },
];

export const navItems = [
  { 
    id: 1, 
    name: "Emprunts & Demandes", 
    path: "/UserDashboard", 
    roles: ["personnelInterne", "client", "partenaire"] 
  },
  { id: 2, 
    name: "Equipements", 
    path: "/userDashboard/Equipements", 
    roles: ["personnelInterne", "client", "partenaire"] 
  },
  { id: 3, 
    name: "Consommables", 
    path: "/userDashboard/Consommable", 
    roles: ["personnelInterne"] 
  },
  { id: 4, 
    name: "Historique", 
    path: "/userDashboard/MesEmprunts", 
    roles: ["personnelInterne", "client", "partenaire"] },
];



