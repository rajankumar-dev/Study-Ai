import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaBell, FaSearch, FaBars } from "react-icons/fa";
import { getNotifications } from "../api/notificationApi";

export default function Navbar({ setSidebarOpen }) {

    const { user, logout } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [notifyOpen, setNotifyOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);

    const dropdownRef = useRef();
    const notifyRef = useRef();

    // FETCH NOTIFICATIONS
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

    // LOGOUT
    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    // CLOSE DROPDOWN ON OUTSIDE CLICK
    useEffect(() => {

        const handler = (e) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }

            if (
                notifyRef.current &&
                !notifyRef.current.contains(e.target)
            ) {
                setNotifyOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () =>
            document.removeEventListener("mousedown", handler);

    }, []);

    // DYNAMIC PAGE TITLE
    const getPageTitle = () => {

        switch (location.pathname) {

            case "/dashboard":
                return "Dashboard";

            case "/notes":
                return "My Notes";

            case "/chat":
                return "AI Chat";

            case "/upload":
                return "Upload Notes";

            case "/profile":
                return "Profile";

            default:
                return "StudyAI";
        }
    };

    return (

        <div className="min-h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 flex items-center justify-between">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-5">

                {/* MENU ICON */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white text-lg"
                >
                    <FaBars />
                </button>

                {/* PAGE TITLE */}
                <div>

                    <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                        {getPageTitle()}
                    </h1>

                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3 md:gap-6">

                {/* SEARCH */}
                <button className="hidden sm:block text-gray-400 dark:text-gray-300 hover:text-gray-600 text-lg transition">

                    <FaSearch />

                </button>

                {/* NOTIFICATION */}
                <div className="relative" ref={notifyRef}>

                    <button
                        onClick={() => setNotifyOpen(!notifyOpen)}
                        className="relative text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white text-lg transition cursor-pointer"
                    >

                        <FaBell />

                        {/* BADGE */}
                        {notifications.length > 0 && (

                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">

                                {notifications.length}

                            </span>
                        )}

                    </button>

                    {/* NOTIFICATION DROPDOWN */}
                    {notifyOpen && (

                        <div className="absolute right-0 mt-4 w-72 md:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden">

                            <div className="p-4 border-b border-gray-100 dark:border-gray-700">

                                <h3 className="font-semibold text-gray-700 dark:text-white">
                                    Notifications
                                </h3>

                            </div>

                            <div className="max-h-80 overflow-y-auto">

                                {notifications.length === 0 ? (

                                    <p className="p-4 text-sm text-gray-700 dark:text-gray-200 leading-6">
                                        No notifications
                                    </p>

                                ) : (

                                    notifications.map((note) => (

                                        <div
                                            key={note._id}
                                            className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition cursor-pointer

        ${note.read
                                                    ? "bg-white dark:bg-gray-800"
                                                    : "bg-blue-50 dark:bg-blue-500/30"
                                                }`}
                                        >

                                            <p className="text-sm text-gray-700 dark:text-gray-200 leading-6">
                                                {note.message}
                                            </p>

                                        </div>
                                    ))
                                )}

                            </div>

                        </div>
                    )}

                </div>

                {/* USER PROFILE */}
                <div className="relative" ref={dropdownRef}>

                    <div
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 cursor-pointer"
                    >

                        {/* AVATAR */}
                        <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg shadow-sm">

                            {user?.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"}

                        </div>

                        {/* USER INFO */}
                        <div className="hidden sm:block">

                            <h3 className="text-sm font-semibold text-gray-700 dark:text-white leading-4">
                                {user?.name || "User"}
                            </h3>

                            <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">
                                AI Upload
                            </p>

                        </div>

                    </div>

                    {/* DROPDOWN */}
                    {open && (

                        <div className="absolute right-0 mt-4 w-52 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-2 z-50">

                            <button
                                onClick={() => navigate("/profile")}
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl cursor-pointer text-sm transition dark:text-white"
                            >
                                👤 Profile
                            </button>

                            <button
                                onClick={() => navigate("/settings")}
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl text-sm transition cursor-pointer dark:text-white"
                            >
                                ⚙️ Settings
                            </button>

                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-500 text-red-500 dark:text-red-400 rounded-xl text-sm transition cursor-pointer"
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