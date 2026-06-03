import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    updateSettings,
    updateProfile,
} from "../api/userApi";


export default function Settings() {


    const { user, login, token } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const [loading, setLoading] = useState(false);

    // LOAD USER DATA
    useEffect(() => {

        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }

        // LOCAL STORAGE SETTINGS
        const savedDark = localStorage.getItem("darkMode");
        const savedNotify = localStorage.getItem("notifications");

        if (savedDark !== null) {
            setDarkMode(savedDark === "true");
        }

        if (savedNotify !== null) {
            setNotifications(savedNotify === "true");
        }

    }, [user]);

    // SAVE SETTINGS
    const handleSave = async () => {
        try {

            setLoading(true);

            // UPDATE PROFILE
            const updatedUser = await updateProfile({
                name,
                email,
            });

            // UPDATE SETTINGS
            await updateSettings({
                darkMode,
                notifications,
            });

            // UPDATE AUTH CONTEXT
            login(
                localStorage.getItem("token"),
                updatedUser.user
            );
            console.log(updatedUser);

            // SAVE LOCAL SETTINGS
            localStorage.setItem("darkMode", darkMode);
            localStorage.setItem("notifications", notifications);

            alert("✅ Settings updated successfully");

        } catch (err) {

            console.log(err);

            alert("❌ Failed to update settings");

        } finally {

            setLoading(false);

        }
    };

    // APPLY DARK MODE
    // useEffect(() => {

    //     if (darkMode) {
    //         document.documentElement.classList.add("dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //     }

    // }, [darkMode]);


    // DARK MODE APPLY
    useEffect(() => {

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

    }, [darkMode]);

    return (

        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Settings
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Manage your account preferences and application settings.
                </p>

            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Profile Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-600">

                    <h2 className="text-xl font-semibold mb-5">
                        Profile
                    </h2>

                    <div className="space-y-4">

                        <div>
                            <label className="text-sm text-gray-500">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                className="w-full mt-1 border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                className="w-full mt-1 border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-2xl transition cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </div>

                {/* Appearance */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">

                    <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
                        Appearance
                    </h2>

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="font-medium text-gray-700 dark:text-white">
                                Dark Mode
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Enable dark theme
                            </p>

                        </div>

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`w-14 h-8 rounded-full cursor-pointer transition relative ${darkMode
                                ? "bg-blue-500"
                                : "bg-gray-300"
                                }`}
                        >

                            <div
                                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${darkMode
                                    ? "left-7"
                                    : "left-1"
                                    }`}
                            ></div>

                        </button>

                    </div>

                </div>

                {/* Notifications */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">

                    <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
                        Notifications
                    </h2>

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="font-medium text-gray-700 dark:text-white">
                                Push Notifications
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Receive app notifications
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                setNotifications(!notifications)
                            }
                            className={`w-14 h-8 rounded-full cursor-pointer transition relative ${notifications
                                ? "bg-green-500"
                                : "bg-gray-300"
                                }`}
                        >

                            <div
                                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${notifications
                                    ? "left-7"
                                    : "left-1"
                                    }`}
                            ></div>

                        </button>

                    </div>

                </div>

                {/* Security */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">

                    <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
                        Security
                    </h2>

                    <div className="space-y-3">

                        <button
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer text-gray-800 dark:text-white"
                            onClick={() =>
                                alert("🔒 Change password feature coming soon")
                            }
                        >
                            Change Password
                        </button>

                        <button
                            className="w-full border border-red-200 dark:border-red-600 text-red-500 dark:text-red-400 rounded-2xl py-3 hover:bg-red-50 dark:hover:bg-red-500/20 transition cursor-pointer"
                            onClick={() => {
                                const confirmDelete = window.confirm(
                                    "Are you sure you want to delete your account?"
                                );

                                if (confirmDelete) {
                                    alert("⚠️ Delete account feature coming soon");
                                }
                            }}
                        >
                            Delete Account
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}