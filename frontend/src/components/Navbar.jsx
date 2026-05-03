import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false); // user dropdown
    const [notifyOpen, setNotifyOpen] = useState(false); // bell dropdown
    const [notifications, setNotifications] = useState([]);
    const dropdownRef = useRef();
    const notifyRef = useRef();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchNotifications();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
            if (notifyRef.current && !notifyRef.current.contains(e.target)) {
                setNotifyOpen(false);
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
            <div className="flex items-center gap-6">

                {/* 🔔 Notification Bell */}
                <div className="relative" ref={notifyRef}>
                    <button
                        onClick={() => setNotifyOpen(!notifyOpen)}
                        className="relative text-xl text-gray-600 hover:text-black"
                    >
                        <FaBell />

                        {/* Badge */}
                        {notifications.map((note) => (
                            <li
                                key={note._id}
                                className={`text-sm p-2 rounded-md ${note.read ? "text-gray-400" : "bg-gray-100"
                                    }`}
                            >
                                {note.message}
                            </li>
                        ))}
                    </button>

                    {/* Dropdown */}
                    {notifyOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-xl border p-3 z-50">

                            <h3 className="text-sm font-semibold mb-2">
                                Notifications
                            </h3>

                            {notifications.length === 0 ? (
                                <p className="text-gray-500 text-sm">
                                    No notifications
                                </p>
                            ) : (
                                <ul className="space-y-2">
                                    {notifications.map((note, i) => (
                                        <li
                                            key={i}
                                            className="text-sm p-2 hover:bg-gray-100 rounded-md"
                                        >
                                            {note}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                {/* 👤 User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>

                        <span className="text-gray-700 text-sm font-medium">
                            {user?.name || "User"}
                        </span>
                    </div>

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
        </div>
    );
}