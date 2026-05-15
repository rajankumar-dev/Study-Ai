import { useEffect, useState } from "react";
import { getNotes } from "../features/notes/notesApi";

export default function Home() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data.notes);
        } catch (err) {
            console.log("Dashboard error:", err);
        }
    };

    return (
        <div>
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-2">
                Welcome to StudyAI!
            </h1>
            <p className="text-gray-500 mb-6">
                Your personal AI study assistant.
            </p>

            {/* 🔥 Dynamic Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-200 p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition duration-200">
                    <h2 className="text-gray-700">Total Notes</h2>
                    <p className="text-3xl font-bold mt-1">
                        {notes.length}
                    </p>
                </div>

                <div className="bg-yellow-200 p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition duration-200">
                    <h2 className="text-gray-700">AI Summaries</h2>
                    <p className="text-3xl font-bold mt-1">
                        {notes.filter(n => n.summary).length}
                    </p>
                </div>

                <div className="bg-green-200 p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition duration-200 ">
                    <h2 className="text-gray-700">Generated Questions</h2>
                    <p className="text-3xl font-bold mt-1">
                        {notes.filter(n => n.questions).length}
                    </p>
                </div>
            </div>

            {/* 🔥 Recent Notes (Dynamic) */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Recent Notes
                </h2>

                <div className="grid grid-cols-3 gap-6">
                    {notes.slice(0, 3).map((note) => (
                        <div
                            key={note._id}
                            className="bg-white rounded-xl shadow overflow-hidden"
                        >
                            <img
                                src="https://source.unsplash.com/400x200/?study"
                                alt="note"
                                className="w-full h-32 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold">
                                    {note.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {note.content.slice(0, 50)}...
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No notes case */}
                {notes.length === 0 && (
                    <p className="text-gray-500 mt-4">
                        No notes found. Create one!
                    </p>
                )}
            </div>
        </div>
    );
}