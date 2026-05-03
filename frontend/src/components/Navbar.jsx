import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // 🔥 close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="flex justify-between h-16 items-center bg-white px-6 shadow-sm">

            {/* Logo */}
            <h1 className="text-xl font-bold">
                Study<span className="text-blue-500">AI</span>
            </h1>

            {/* Right */}
            <div className="relative" ref={dropdownRef}>

                {/* User Button */}
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 cursor-pointer mx-5"
                >
                    <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>

                    <span className="text-gray-700 text-sm font-medium">
                        {user?.name || "User"}
                    </span>
                </div>

                {/* Dropdown */}
                {open && (
                    <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border p-2 z-50">

                        <button
                            onClick={() => navigate("/profile")}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm"
                        >
                            👤 Profile
                        </button>

                        <button
                            onClick={() => navigate("/settings")}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm"
                        >
                            ⚙️ Settings
                        </button>

                        <hr className="my-2" />

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-500 rounded-md text-sm"
                        >
                            🚪 Logout
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}