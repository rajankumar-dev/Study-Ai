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

        <div className="min-h-full">

            {/* TOP HEADING */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    Welcome to StudyAI!
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Your personal AI study assistant.
                </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

                {/* CARD 1 */}
                <div className="bg-blue-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-all duration-200 border border-blue-100">

                    <h2 className="text-gray-700 text-lg font-medium">
                        Total Notes
                    </h2>

                    <p className="text-4xl font-bold text-black mt-3">
                        {notes.length}
                    </p>

                </div>

                {/* CARD 2 */}
                <div className="bg-yellow-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-all duration-200 border border-yellow-100">

                    <h2 className="text-gray-700 text-lg font-medium">
                        AI Summaries
                    </h2>

                    <p className="text-4xl font-bold text-black mt-3">
                        {notes.filter((n) => n.summary).length}
                    </p>

                </div>

                {/* CARD 3 */}
                <div className="bg-green-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-all duration-200 border border-green-100">

                    <h2 className="text-gray-700 text-lg font-medium">
                        Generated Questions
                    </h2>

                    <p className="text-4xl font-bold text-black mt-3">
                        {notes.filter((n) => n.questions).length}
                    </p>

                </div>

            </div>

            {/* RECENT NOTES */}
            <div>

                <div className="flex items-center gap-4 mb-6">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Recent Notes
                    </h2>

                    <div className="flex-1 h-[1px] bg-gray-200"></div>

                </div>

                {/* NOTES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {notes.slice(0, 3).map((note, index) => (

                        <div
                            key={note._id}
                            className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                        >

                            {/* IMAGE */}
                            <div className="h-44 overflow-hidden">

                                <img
                                    src={
                                        index === 0
                                            ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                                            : index === 1
                                                ? "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop"
                                                : "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop"
                                    }
                                    alt="note"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />

                            </div>

                            {/* CONTENT */}
                            <div className="p-5">

                                <h3 className="font-bold text-xl text-gray-800 line-clamp-1">
                                    {note.title}
                                </h3>

                                <p className="text-gray-500 mt-3 leading-7 line-clamp-2">
                                    {note.content}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

                {/* EMPTY */}
                {notes.length === 0 && (

                    <div className="bg-white rounded-3xl p-10 text-center border border-gray-200 mt-6">

                        <div className="text-6xl mb-4">
                            📚
                        </div>

                        <h3 className="text-2xl font-bold text-gray-700">
                            No Notes Found
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Upload or create your first study note.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}