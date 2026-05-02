import Layout from "../components/Layout";

export default function Home() {
    return (

        <div>
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-2">
                Welcome to StudyAI!
            </h1>
            <p className="text-gray-500 mb-6">
                Your personal AI study assistant.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-200 p-6 rounded-xl shadow">
                    <h2 className="text-gray-700">Total Notes</h2>
                    <p className="text-3xl font-bold">15</p>
                </div>

                <div className="bg-yellow-200 p-6 rounded-xl shadow">
                    <h2 className="text-gray-700">AI Summaries</h2>
                    <p className="text-3xl font-bold">8</p>
                </div>

                <div className="bg-green-200 p-6 rounded-xl shadow">
                    <h2 className="text-gray-700">Generated Questions</h2>
                    <p className="text-3xl font-bold">24</p>
                </div>
            </div>

            {/* Recent Notes */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Recent Notes
                </h2>

                <div className="grid grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <img
                            src="https://source.unsplash.com/400x200/?books"
                            alt="note"
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">
                                Physics Chapter 1
                            </h3>
                            <p className="text-sm text-gray-500">
                                Overview
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <img
                            src="https://source.unsplash.com/400x200/?nature"
                            alt="note"
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">
                                Biology Notes
                            </h3>
                            <p className="text-sm text-gray-500">
                                Study Guide
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <img
                            src="https://source.unsplash.com/400x200/?history"
                            alt="note"
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">
                                History Lecture
                            </h3>
                            <p className="text-sm text-gray-500">
                                Notes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}