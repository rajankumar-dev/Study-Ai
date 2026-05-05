import { useEffect, useState } from "react";
import axios from "axios";
import { getNotes, deleteNote } from "../features/notes/notesApi";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [summary, setSummary] = useState(""); // ✅ FIX

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

    // ✅ FIXED SUMMARY FUNCTION
    const handleSummary = async () => {
        try {
            const res = await axios.post(
                "http://localhost:4000/api/ai/summary", // ✅ FIXED
                { text: selectedNote.content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setSummary(res.data.summary);
        } catch (err) {
            console.error(err);
            alert("Summary failed");
        }
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        fetchNotes();
        setSummary(""); // reset
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
                            onClick={() => {
                                setSelectedNote(note);
                                setSummary(""); // reset summary
                            }}
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
                    <p className="text-gray-500">No note selected</p>
                ) : (
                    <>
                        {/* BUTTONS */}
                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={handleSummary}
                                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Summarize
                            </button>

                            <button className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                                Ask AI
                            </button>

                            <button
                                onClick={() => handleDelete(selectedNote._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="bg-white p-6 rounded-xl shadow max-h-[500px] overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-2">
                                {selectedNote.title}
                            </h2>

                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                {selectedNote.content}
                            </p>

                            {/* ✅ SUMMARY UI */}
                            {summary && (
                                <div className="mt-6 p-4 bg-gray-100 rounded">
                                    <h3 className="font-bold mb-2">Summary:</h3>
                                    <p className="text-gray-700 whitespace-pre-line">
                                        {summary}
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}