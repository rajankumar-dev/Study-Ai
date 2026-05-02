export default function Navbar() {
    return (
        <div className="bg-white shadow px-6 py-3 flex justify-between items-center">

            <h2 className="font-semibold text-lg">Dashboard</h2>

            <div className="flex items-center gap-4">
                <span className="text-gray-600">Rajan Kumar</span>

                <img
                    src="https://i.pravatar.cc/40"
                    alt="user"
                    className="w-8 h-8 rounded-full"
                />
            </div>

        </div>
    );
}