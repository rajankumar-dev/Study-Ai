import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

            {/* Sidebar */}
            <div className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-md border-r border-gray-200 dark:border-gray-700">
                <Sidebar />
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col overflow-hidden">

                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <Navbar />
                </div>

                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto text-gray-800 dark:text-white">
                    {children}
                </div>

            </div>
        </div>
    );
}