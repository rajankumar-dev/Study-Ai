import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <Sidebar />
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col">

                <Navbar />

                <div className="p-6 overflow-y-auto">
                    {children}
                </div>

            </div>
        </div>
    );
}