import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex justify-between h-16 items-center bg-white px-6 shadow-sm">

            {/* Left - Logo */}
            <h1 className="text-xl font-bold">
                Study<span className="text-blue-500">AI</span>
            </h1>

            {/* Right - User */}
            <div className="flex items-center gap-4">

                {/* User Info */}
                <div className="flex items-center gap-2">

                    {/* Avatar */}
                    <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>

                    {/* Name */}
                    <span className="text-gray-700 text-sm font-medium">
                        {user?.name || "User"}
                    </span>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                >
                    Logout
                </button>

            </div>
        </div>
    );
}