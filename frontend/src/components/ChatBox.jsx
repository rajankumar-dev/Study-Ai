import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function ChatBox({ note }) {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const sendMessage = async () => {

        if (!input.trim()) return;

        const userMessage = {
            role: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentInput = input;

        setInput("");
        setLoading(true);

        try {

            const res = await axios.post(
                "https://study-ai-backend-igdr.onrender.com/api/ai/ask",
                {
                    question: currentInput,
                    content: note.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const aiMessage = {
                role: "ai",
                text: res.data.answer,
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (err) {

            console.error(err);

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: "Something went wrong. Please try again.",
                },
            ]);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden">

            {/* HEADER */}
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">

                <div>

                    <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                        AI Study Assistant
                    </h2>

                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Ask questions from your selected notes
                    </p>

                </div>

                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    AI
                </div>

            </div>

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto px-3 md:px-6 py-5 bg-gray-50 dark:bg-gray-900 space-y-5">

                {messages.length === 0 && (

                    <div className="h-full flex flex-col items-center justify-center text-center">

                        <div className="text-5xl md:text-6xl mb-4">
                            🤖
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-white mb-2">
                            Start Conversation
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 max-w-md px-4">
                            Ask AI anything related to your notes.
                            The assistant will use your uploaded study material
                            to answer intelligently.
                        </p>

                    </div>
                )}

                {messages.map((msg, i) => (

                    <div
                        key={i}
                        className={`flex ${msg.role === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >

                        <div
                            className={`max-w-[90%] md:max-w-[75%] px-4 md:px-5 py-3 md:py-4 rounded-3xl shadow-sm whitespace-pre-line leading-7 break-words
                            
                            ${msg.role === "user"
                                    ? "bg-blue-500 text-white rounded-br-md"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-md"
                                }`}
                        >

                            {msg.text}

                        </div>

                    </div>
                ))}

                {/* LOADING */}
                {loading && (

                    <div className="flex justify-start">

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 py-4 rounded-3xl rounded-bl-md shadow-sm">

                            <div className="flex gap-2">

                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>

                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>

                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>

                            </div>

                        </div>

                    </div>
                )}

                <div ref={bottomRef}></div>

            </div>

            {/* INPUT AREA */}
            <div className="p-3 md:p-5 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Ask something about your notes..."
                        className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-2xl font-medium transition shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "..." : "Send"}
                    </button>

                </div>

            </div>

        </div>
    );
}