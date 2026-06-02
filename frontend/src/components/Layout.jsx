import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (

                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />

            )}

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 md:hidden
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >

                <Sidebar />

            </div>

            {/* DESKTOP SIDEBAR */}
            <div className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-md border-r border-gray-200 dark:border-gray-700">

                <Sidebar />

            </div>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">

                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">

                    <Navbar setSidebarOpen={setSidebarOpen} />

                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 text-gray-800 dark:text-white">

                    {children}

                </div>

            </div>

        </div>

    );
}