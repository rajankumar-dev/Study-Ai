import { useEffect, useState } from "react";
import axios from "axios";
import {
    getNotes,
    deleteNote,
    toggleFavorite,
} from "../features/notes/notesApi";

import ChatBox from "../components/ChatBox";

import {
    FaHeart,
    FaRegHeart,
} from "react-icons/fa";

export default function Notes() {

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    const [summary, setSummary] = useState("");
    const [questions, setQuestions] = useState("");
    const [viewMode, setViewMode] = useState("note");


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

                {
                    noteId: selectedNote._id,
                    text: selectedNote.content,
                }
                ,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setSummary(res.data.summary);
            setQuestions("");
            setViewMode("summary");

        } catch (err) {

            console.error(err);
            alert("Summary failed");

        }
    };

    // QUESTIONS
    const handleQuestions = async () => {

        try {

            const res = await axios.post(
                "http://localhost:4000/api/questions/generate",
                {
                    text: selectedNote.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setQuestions(res.data.questions);
            setSummary("");
            setViewMode("questions");

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

        <div className="flex flex-col xl:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">

            {/* LEFT SIDE */}
            <div className="w-full lg:w-[320px] xl:min-w-[320px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">

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
                                    : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 hover:shadow-md"
                                }`}
                        >

                            {/* TITLE + FAVORITE */}
                            <div className="flex items-start justify-between gap-2">

                                <h3 className="font-semibold text-base truncate flex-1">
                                    {note.title}
                                </h3>

                                <button
                                    onClick={async (e) => {

                                        e.stopPropagation();

                                        try {

                                            await toggleFavorite(note._id);

                                            setNotes((prev) =>
                                                prev.map((n) =>
                                                    n._id === note._id
                                                        ? {
                                                            ...n,
                                                            favorite: !n.favorite,
                                                        }
                                                        : n
                                                )
                                            );

                                            if (selectedNote?._id === note._id) {

                                                setSelectedNote({
                                                    ...selectedNote,
                                                    favorite: !selectedNote.favorite,
                                                });

                                            }

                                        } catch (err) {

                                            console.log(err);

                                        }
                                    }}
                                    className="text-red-500 text-lg cursor-pointer"
                                >

                                    {note.favorite
                                        ? <FaHeart />
                                        : <FaRegHeart />
                                    }

                                </button>

                            </div>

                            {/* CONTENT */}
                            <p
                                className={`text-sm mt-2 line-clamp-2
                                
                                ${selectedNote?._id === note._id
                                        ? "text-blue-600"
                                        : "text-gray-500 dark:text-gray-400"
                                    }`}
                            >
                                {note.content}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto">

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
                                onClick={() => {
                                    setShowChat(true);
                                    setViewMode("chat");
                                }}
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
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md h-[70vh] overflow-y-auto">

                            {(viewMode === "summary" || viewMode === "questions") && (

                                <div className="p-6">

                                    <button
                                        onClick={() => setViewMode("note")}
                                        className="mb-5 text-blue-500 font-medium"
                                    >
                                        ← Back to Note
                                    </button>

                                    {summary && (
                                        <>
                                            <h2 className="text-2xl font-bold mb-4">
                                                AI Summary
                                            </h2>

                                            <p className="leading-8 whitespace-pre-line">
                                                {summary}
                                            </p>
                                        </>
                                    )}

                                    {questions && (
                                        <>
                                            <h2 className="text-2xl font-bold mb-4">
                                                Generated Questions
                                            </h2>

                                            <p className="leading-8 whitespace-pre-line">
                                                {questions}
                                            </p>
                                        </>
                                    )}

                                </div>
                            )}

                            {viewMode === "chat" && (

                                <div className="h-full">

                                    <div className="p-4 border-b">

                                        <button
                                            onClick={() => {
                                                setShowChat(false);
                                                setViewMode("note");
                                            }}
                                            className="text-blue-500 font-medium"
                                        >
                                            ← Back to Note
                                        </button>

                                    </div>

                                    <ChatBox note={selectedNote} />

                                </div>
                            )}

                            {viewMode === "note" && (

                                <div className="p-6 md:p-8">

                                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                                        {selectedNote.title}
                                    </h2>

                                    <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-8">
                                        {selectedNote.content}
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