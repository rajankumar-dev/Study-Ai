import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../features/notes/notesApi";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    // Fetch notes
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data.notes);

            if (data.notes.length > 0) {
                setSelectedNote(data.notes[0]);
            }
        } catch (err) {
            console.log("Error fetching notes", err);
        }
    };

    // Delete note
    const handleDelete = async (id) => {
        await deleteNote(id);
        fetchNotes();
    };

    return (
        <div className="flex h-[calc(100vh-70px)] bg-gray-100">

            {/* LEFT SIDE */}
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

            {/* RIGHT SIDE */}
            <div className="flex-1 p-6">

                {!selectedNote ? (
                    <p className="text-gray-500">
                        No note selected
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

                            <button
                                onClick={() => handleDelete(selectedNote._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
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

                            {/* Optional extracted text */}
                            {selectedNote.extractedText && (
                                <div className="mt-4 text-sm text-gray-500">
                                    <strong>Extracted:</strong> {selectedNote.extractedText}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}