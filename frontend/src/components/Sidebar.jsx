import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const menu = [
        { name: "Dashboard", path: "/dashboard" }, // ✅ change किया
        { name: "My Notes", path: "/notes" },
        { name: "AI Chat", path: "/chat" },
        { name: "Upload Notes", path: "/create" },
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
                            end={item.path === "/dashboard"} // 🔥 important fix
                            className={({ isActive }) =>
                                `block p-2 rounded-lg transition ${isActive
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-200 text-gray-700"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}