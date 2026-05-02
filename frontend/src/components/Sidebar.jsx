import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const menu = [
        { name: "Dashboard", path: "/" },
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
                        <Link
                            to={item.path}
                            className={`block p-2 rounded-lg ${location.pathname === item.path
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-200"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}