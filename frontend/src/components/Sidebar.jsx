import { NavLink } from "react-router-dom";
import { FaHome, FaBook, FaRobot, FaUpload } from "react-icons/fa";

export default function Sidebar() {

    const menu = [
        { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
        { name: "My Notes", path: "/notes", icon: <FaBook /> },
        { name: "AI Chat", path: "/chat", icon: <FaRobot /> },
        { name: "Upload Notes", path: "/upload", icon: <FaUpload /> },
    ];

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-8">
                Study<span className="text-blue-500">AI</span>
            </h1>

            <ul className="space-y-3">
                {menu.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            end={item.path === "/dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                    ? "bg-blue-100 text-blue-600"
                                    : "hover:bg-gray-200 text-gray-700"
                                }`
                            }
                        >
                            {/* Icon */}
                            <span className="text-lg">
                                {item.icon}
                            </span>

                            {/* Text */}
                            <span className="font-medium">
                                {item.name}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}