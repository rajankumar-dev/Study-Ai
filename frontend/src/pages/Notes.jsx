import { useState } from "react";

export default function Notes() {
    const [selectedNote, setSelectedNote] = useState(null);

    // Dummy data (baad me API se aayega)
    const notes = [
        {
            _id: 1,
            title: "Node.js Tutorial",
            content: "Learn the basics of Node.js and Express framework.",
        },
        {
            _id: 2,
            title: "Biology Study Guide",
            content: "Covers cell structure, DNA, and human anatomy.",
        },
        {
            _id: 3,
            title: "Ancient History",
            content: "Study of early civilizations and cultures.",
        },
    ];

    return (
        <div className="flex h-[calc(100vh-70px)] bg-gray-100">

            {/* LEFT SIDE - NOTES LIST */}
            <div className="w-1/3 bg-white border-r p-4">
                <h2 className="text-lg font-semibold mb-4">My Notes</h2>

                <div className="space-y-2">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            onClick={() => setSelectedNote(note)}
                            className={`p-3 rounded-lg cursor-pointer ${selectedNote?._id === note._id
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-200"
                                }`}
                        >
                            {note.title}
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE - NOTE DETAIL */}
            <div className="flex-1 p-6">

                {!selectedNote ? (
                    <p className="text-gray-500">
                        Select a note to view details
                    </p>
                ) : (
                    <>
                        {/* ACTION BUTTONS */}
                        <div className="flex gap-3 mb-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                Summarize
                            </button>

                            <button className="bg-green-500 text-white px-4 py-2 rounded">
                                Ask AI
                            </button>

                            <button className="bg-purple-500 text-white px-4 py-2 rounded">
                                Generate Questions
                            </button>
                        </div>

                        {/* NOTE CONTENT */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-2xl font-bold mb-2">
                                {selectedNote.title}
                            </h2>

                            <p className="text-gray-600">
                                {selectedNote.content}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}