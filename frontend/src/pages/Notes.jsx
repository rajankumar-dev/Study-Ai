import { useEffect, useState } from "react";
import axios from "axios";
import { getNotes, deleteNote } from "../features/notes/notesApi";
import ChatBox from "../components/ChatBox";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    const [summary, setSummary] = useState("");
    const [questions, setQuestions] = useState("");

    const [showChat, setShowChat] = useState(false);

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

    // SUMMARY
    const handleSummary = async () => {
        try {
            const res = await axios.post(
                "http://localhost:4000/api/ai/summary",
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

    // GENERATE QUESTIONS
    const handleQuestions = async () => {
        try {
            const res = await axios.post(
                "http://localhost:4000/api/questions/generate",
                { text: selectedNote.content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setQuestions(res.data.questions);

        } catch (err) {
            console.error(err);
            alert("Question generation failed");
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        await deleteNote(id);

        fetchNotes();

        setSummary("");
        setQuestions("");
        setShowChat(false);
    };

    return (
        <div className="flex h-[calc(100vh-70px)] bg-gray-100">

            {/* LEFT SIDE */}
            <div className="w-1/3 bg-white border-r p-4">

                <h2 className="text-lg font-semibold mb-4">
                    My Notes
                </h2>

                <div className="space-y-2">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            onClick={() => {
                                setSelectedNote(note);

                                setSummary("");
                                setQuestions("");

                                setShowChat(false);
                            }}
                            className={`p-3 rounded-lg cursor-pointer transition ${selectedNote?._id === note._id
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-200 bg-gray-50"
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

                        {/* BUTTONS */}
                        <div className="flex gap-3 mb-4 flex-wrap">

                            <button
                                onClick={handleSummary}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Summarize
                            </button>

                            <button
                                onClick={handleQuestions}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Generate Questions
                            </button>

                            <button
                                onClick={() => setShowChat(true)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Ask AI
                            </button>

                            <button
                                onClick={() => handleDelete(selectedNote._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>

                        {/* MAIN VIEW SWITCH */}
                        {showChat ? (

                            // CHAT VIEW
                            <div className="bg-white p-6 rounded-xl shadow h-full flex flex-col">

                                <button
                                    onClick={() => setShowChat(false)}
                                    className="mb-4 text-blue-500"
                                >
                                    ← Back to Note
                                </button>

                                <ChatBox note={selectedNote} />

                            </div>

                        ) : (

                            // NOTE VIEW
                            <div className="bg-white p-6 rounded-xl shadow max-h-[700px] overflow-y-auto">

                                <h2 className="text-2xl font-bold mb-4">
                                    {selectedNote.title}
                                </h2>

                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                    {selectedNote.content}
                                </p>

                                {/* SUMMARY */}
                                {summary && (
                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border">

                                        <h3 className="font-bold text-lg mb-2">
                                            AI Summary
                                        </h3>

                                        <p className="text-gray-700 whitespace-pre-line">
                                            {summary}
                                        </p>

                                    </div>
                                )}

                                {/* QUESTIONS */}
                                {questions && (
                                    <div className="mt-6 p-4 bg-purple-50 rounded-lg border">

                                        <h3 className="font-bold text-lg mb-3">
                                            Generated Questions
                                        </h3>

                                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                            {questions}
                                        </p>

                                    </div>
                                )}

                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}