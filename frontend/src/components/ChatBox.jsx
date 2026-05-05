import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function ChatBox({ note }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:4000/api/ai/ask",
                {
                    question: input,
                    content: note.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const aiMessage = { role: "ai", text: res.data.answer };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[400px] border rounded-lg">

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-lg max-w-[70%] ${msg.role === "user"
                            ? "bg-blue-500 text-white ml-auto"
                            : "bg-gray-200 text-black"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}

                {loading && (
                    <p className="text-sm text-gray-500">AI is typing...</p>
                )}
            </div>

            {/* INPUT */}
            <div className="flex border-t">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    placeholder="Ask something..."
                    className="flex-1 p-3 outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4"
                >
                    Send
                </button>
            </div>
        </div>
    );
}