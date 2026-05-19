import { useEffect, useRef, useState } from "react";
import API from "../api/axios";

export default function Chat() {

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [chat, loading]);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMsg = {
            type: "user",
            text: message,
        };

        setChat((prev) => [...prev, userMsg]);

        const currentMessage = message;

        setMessage("");
        setLoading(true);

        try {

            const res = await API.post("/ai/ask", {
                question: currentMessage,
            });

            const botMsg = {
                type: "bot",
                text: res.data.answer,
            };

            setChat((prev) => [...prev, botMsg]);

        } catch (err) {

            setChat((prev) => [
                ...prev,
                {
                    type: "bot",
                    text: "Something went wrong. Please try again.",
                },
            ]);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="h-[calc(100vh-90px)] flex flex-col bg-white rounded-3xl shadow-md overflow-hidden">

            {/* HEADER */}
            <div className="px-7 py-5  bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-bold">
                        StudyAI Assistant
                    </h1>

                    <p className="text-sm text-blue-100 mt-1">
                        Your personal AI powered study companion
                    </p>

                </div>

                <div className="w-12 h-12 rounded-full bg-blue-400 backdrop-blur flex items-center justify-center text-xl font-bold border border-white/30">
                    🤖
                </div>

            </div>

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50 space-y-5">

                {/* EMPTY STATE */}
                {chat.length === 0 && (

                    <div className="h-full flex flex-col items-center justify-center text-center">

                        <div className="text-7xl mb-5">
                            🤖
                        </div>

                        <h2 className="text-3xl font-bold text-gray-700 mb-3">
                            Ask Anything
                        </h2>

                        <p className="text-gray-500 max-w-lg leading-7">
                            Ask coding, study, technology, project,
                            programming, AI or general knowledge questions.
                            StudyAI will help you instantly.
                        </p>

                    </div>
                )}

                {/* CHAT MESSAGES */}
                {chat.map((msg, i) => (

                    <div
                        key={i}
                        className={`flex ${msg.type === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >

                        <div
                            className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-sm whitespace-pre-line leading-7 ${msg.type === "user"
                                ? "bg-blue-500 text-white rounded-br-md"
                                : "bg-white border border-gray-200 text-gray-700 rounded-bl-md"
                                }`}
                        >

                            {msg.text}

                        </div>

                    </div>
                ))}

                {/* LOADING */}
                {loading && (

                    <div className="flex justify-start">

                        <div className="bg-white border border-gray-300 px-5 py-4 rounded-3xl rounded-bl-md shadow-sm">

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
            <div className="p-5 bg-white">

                <div className="flex items-center gap-3">

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Ask anything..."
                        className="flex-1 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-4 rounded-2xl font-medium transition shadow-sm disabled:opacity-50"
                    >
                        {loading ? "..." : "Send"}
                    </button>

                </div>

            </div>

        </div>
    );
}