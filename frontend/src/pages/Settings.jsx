import { useState } from "react";

export default function Settings() {

    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (

        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Settings
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your account preferences and application settings.
                </p>

            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Profile Settings */}
                <div className="bg-white rounded-3xl p-6 shadow-sm ">

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
                                placeholder="Rajan Kumar"
                                className="w-full mt-1 border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="rajan@gmail.com"
                                className="w-full mt-1 border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-2xl transition cursor-pointer">
                            Save Changes
                        </button>

                    </div>

                </div>

                {/* Appearance */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">

                    <h2 className="text-xl font-semibold mb-5">
                        Appearance
                    </h2>

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="font-medium text-gray-700">
                                Dark Mode
                            </h3>

                            <p className="text-sm text-gray-500">
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
                <div className="bg-white rounded-3xl p-6 shadow-sm">

                    <h2 className="text-xl font-semibold mb-5">
                        Notifications
                    </h2>

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="font-medium text-gray-700">
                                Push Notifications
                            </h3>

                            <p className="text-sm text-gray-500">
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
                <div className="bg-white rounded-3xl p-6 shadow-sm">

                    <h2 className="text-xl font-semibold mb-5">
                        Security
                    </h2>

                    <div className="space-y-3">

                        <button className="w-full border rounded-2xl py-3 hover:bg-gray-50 transition cursor-pointer">
                            Change Password
                        </button>

                        <button className="w-full border border-red-200 text-red-500 rounded-2xl py-3 hover:bg-red-50 transition cursor-pointer">
                            Delete Account
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}