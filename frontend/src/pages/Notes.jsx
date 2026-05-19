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
            <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col">

                {/* Heading */}
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">
                        My Notes
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {notes.length} Notes Available
                    </p>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">

                    {notes.map((note) => (
                        <div
                            key={note._id}
                            onClick={() => {
                                setSelectedNote(note);

                                setSummary("");
                                setQuestions("");

                                setShowChat(false);
                            }}
                            className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border
                            
                        ${selectedNote?._id === note._id
                                    ? "bg-blue-100 text-blue-600 shadow-lg border-blue-200 scale-[1.02]"
                                    : "bg-white hover:bg-gray-100 border-gray-200 hover:shadow-md"
                                }`}
                        >

                            <h3 className="font-semibold text-base truncate">
                                {note.title}
                            </h3>

                            <p className={`text-sm mt-2 line-clamp-2
                            
                        ${selectedNote?._id === note._id
                                    ? "text-blue-600"
                                    : "text-gray-500"
                                }`}
                            >
                                {note.content}
                            </p>

                        </div>
                    ))}

                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 p-6 overflow-hidden">

                {!selectedNote ? (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500 text-lg">
                            No note selected
                        </p>
                    </div>
                ) : (
                    <>

                        {/* BUTTONS */}
                        <div className="flex gap-3 mb-5 flex-wrap">

                            <button
                                onClick={handleSummary}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition"
                            >
                                Summarize
                            </button>

                            <button
                                onClick={handleQuestions}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition"
                            >
                                Generate Questions
                            </button>

                            <button
                                onClick={() => setShowChat(true)}
                                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition"
                            >
                                Ask AI
                            </button>

                            <button
                                onClick={() => handleDelete(selectedNote._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition"
                            >
                                Delete
                            </button>

                        </div>

                        {/* MAIN VIEW */}
                        {showChat ? (

                            // CHAT VIEW
                            <div className="bg-white rounded-3xl shadow-md h-[calc(100vh-170px)] flex flex-col overflow-hidden">

                                <div className="p-4 border-b border-gray-100">
                                    <button
                                        onClick={() => setShowChat(false)}
                                        className="text-blue-500 font-medium"
                                    >
                                        ← Back to Note
                                    </button>
                                </div>

                                <div className="flex-1 overflow-hidden">
                                    <ChatBox note={selectedNote} />
                                </div>

                            </div>

                        ) : (

                            // NOTE VIEW
                            <div className="grid grid-cols-3 gap-6 h-[calc(100vh-170px)]">

                                {/* NOTE CONTENT */}
                                <div className="col-span-2 bg-white rounded-3xl shadow-md p-8 overflow-y-auto">

                                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                                        {selectedNote.title}
                                    </h2>

                                    <p className="text-gray-700 whitespace-pre-line leading-8 text-[16px]">
                                        {selectedNote.content}
                                    </p>

                                </div>

                                {/* AI RESULT PANEL */}
                                <div className="bg-white rounded-3xl shadow-md p-6 overflow-y-auto">

                                    <h2 className="text-xl font-bold text-gray-800 mb-5">
                                        AI Assistant
                                    </h2>

                                    {/* SUMMARY */}
                                    {summary && (
                                        <div className="mb-6">

                                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

                                                <h3 className="font-bold text-blue-700 mb-3">
                                                    AI Summary
                                                </h3>

                                                <p className="text-gray-700 whitespace-pre-line leading-7">
                                                    {summary}
                                                </p>

                                            </div>

                                        </div>
                                    )}

                                    {/* QUESTIONS */}
                                    {questions && (
                                        <div>

                                            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">

                                                <h3 className="font-bold text-purple-700 mb-3">
                                                    Generated Questions
                                                </h3>

                                                <p className="text-gray-700 whitespace-pre-line leading-7">
                                                    {questions}
                                                </p>

                                            </div>

                                        </div>
                                    )}

                                    {/* EMPTY STATE */}
                                    {!summary && !questions && (
                                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">

                                            <div className="text-5xl mb-4">
                                                🤖
                                            </div>

                                            <h3 className="font-semibold text-lg text-gray-600">
                                                AI Output
                                            </h3>

                                            <p className="text-sm mt-2">
                                                Generate summary or questions
                                                from your notes.
                                            </p>

                                        </div>
                                    )}

                                </div>

                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}