import { useState } from "react";
import API from "../api/axios";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (!message) return;

        const userMsg = { type: "user", text: message };
        setChat((prev) => [...prev, userMsg]);

        try {
            const res = await API.post("/ai/ask", {
                question: message,
            });

            const botMsg = {
                type: "bot",
                text: res.data.answer,
            };

            setChat((prev) => [...prev, botMsg]);
        } catch (err) {
            setChat((prev) => [
                ...prev,
                { type: "bot", text: "Error getting answer" },
            ]);
        }

        setMessage("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)]">

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-xl">

                {chat.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-xl max-w-md ${msg.type === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-white shadow"
                                }`}
                        >
                            {/* 🔥 YAHAN CHANGE */}
                            <div className="whitespace-pre-line">
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Input */}
            <div className="flex gap-2 mt-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 border rounded-lg px-4 py-2 outline-none"
                />

                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-6 rounded-lg"
                >
                    Send
                </button>
            </div>

        </div>
    );
}