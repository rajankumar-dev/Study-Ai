import { useState } from "react";
import API from "../api/axios";

const Chat = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleAsk = async () => {
        const res = await API.post("/ai/ask", { question });
        setAnswer(res.data.answer);
    };

    return (
        <div>
            <h2>Chat with Notes</h2>

            <input
                placeholder="Ask something..."
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button onClick={handleAsk}>Ask</button>

            <p><b>Answer:</b> {answer}</p>
        </div>
    );
};

export default Chat;