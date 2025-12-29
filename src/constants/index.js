import {
  FaChartBar,
  FaUsers,
  FaHandHolding,
  FaBoxOpen,
  FaTools,
  FaCogs,
  FaListAlt,
  FaBell, 
  FaCog,
} from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";


export const links = [
  {
    id: 1,
    href: "/AdminDashboard",
    icon: FaChartBar,
    text: "dashboard",
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    id: 2,
    href: "/User",
    icon: FaUsers,
    text: "users",
    roles: ["admin"]
  },
  {
    id: 3,
    href: "/Emprunt",
    icon: FaHandHolding,
    text: "loans",
    badge: {
      text: "Pro",
      color: "bg-gray-100 text-gray-800",
      darkColor: "dark:bg-gray-700 dark:text-gray-300",
    },
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    id: 4,
    href: "/Consommable",
    icon: FaBoxOpen,
    text: "consumables",
    badge: {
      text: "4",
      color: "bg-blue-100 text-blue-800",
      darkColor: "dark:bg-blue-900 dark:text-blue-300",
    },
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    id: 5,
    href: "/Equipement",
    icon: FaTools,
    text: "equipments",
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    id: 6,
    href: "/Demande",
    icon: LuClipboardList,
    text: "requests",
    roles: ["admin"]
  },
  {
    id: 7,
    href: "/Utilisation",
    icon: FaCogs,
    text: "consumableUsage",
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    id: 8,
    href: "/Notification",
    icon: FaBell,
    text: "notification",
    roles: ["admin"]
  },
  {
    id: 9,
    href: "/Rapport",
    icon: FaListAlt,
    text: "report",
    roles: ["admin", "regisseurEquipementInterne"]
  },
  {
    id: 10,
    href: "/Setting",
    icon: FaCog,
    text: "Setting",
    roles: ["admin", "regisseurEquipementInterne"]
  },
];

export const navItems = [
  { 
    id: 1, 
    name: "equipments", 
    path: "/userDashboard/Equipements", 
    roles: ["personnelInterne", "client", "partenaire"] 
  },
  { 
    id: 2, 
    name: "consumables", 
    path: "/userDashboard/Consommable", 
    roles: ["personnelInterne"] 
  },
  { 
    id: 3, 
    name: "loansAndRequests", 
    path: "/UserDashboard", 
    roles: ["personnelInterne", "client", "partenaire"] 
  },
  { 
    id: 4, 
    name: "history", 
    path1: "/userDashboard/MesEmprunts", 
    path2: "/userDashboard/MesUtilisation", 
    roles: ["personnelInterne"] 
  },
  { 
    id: 5, 
    name: "history2", 
    path: "/userDashboard/MesEmprunts", 
    roles: ["client", "partenaire"] 
  },
];



