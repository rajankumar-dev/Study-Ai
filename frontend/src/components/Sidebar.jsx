import {
    FaHome,
    FaBook,
    FaRobot,
    FaUpload,
    FaHeart,
    FaCog
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Sidebar() {

    const { user } = useAuth();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },
        {
            name: "My Notes",
            path: "/notes",
            icon: <FaBook />
        },
        {
            name: "AI Chat",
            path: "/chat",
            icon: <FaRobot />
        },
        {
            name: "Upload Notes",
            path: "/upload",
            icon: <FaUpload />
        },
        {
            name: "Favorites",
            path: "/favorites",
            icon: <FaHeart />
        },
        {
            name: "Settings",
            path: "/settings",
            icon: <FaCog />
        },
    ];

    return (

        <div className="h-full flex flex-col bg-white border-r border-gray-200">

            {/* LOGO */}
            <div className="h-20 flex items-center px-6 border-b border-gray-100">

                <h1 className="text-3xl font-bold text-gray-800">
                    Study<span className="text-blue-500">AI</span>
                </h1>

            </div>

            {/* MENU */}
            <div className="flex-1 py-6 px-4 space-y-3">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.name}
                        to={item.path}

                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 font-medium
                
                            ${isActive
                                ? "bg-blue-100 text-blue-600 shadow-sm"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >


                        <span className="text-lg">
                            {item.icon}
                        </span>

                        <span className="text-[16px]">
                            {item.name}
                        </span>

                    </NavLink>
                ))}

            </div>

            {/* USER CARD */}
            <div className="p-4 border-t border-gray-100">

                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">

                    {/* AVATAR */}
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">

                        {user?.name
                            ? user.name.charAt(0).toUpperCase()
                            : "U"}

                    </div>

                    {/* INFO */}
                    <div>

                        <h3 className="font-semibold text-gray-700">
                            {user?.name || "User"}
                        </h3>

                        <p className="text-sm text-gray-400">
                            AI Upload
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}