import { useEffect, useState } from "react";
import API from "../services/api";

const Home = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const res = await API.get("/notes");
            setNotes(res.data.notes);
        };
        fetchNotes();
    }, []);

    return (
        <div>
            <h2>My Notes</h2>

            {notes.map((note) => (
                <div key={note._id} style={{ border: "1px solid", margin: 10 }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>

                    {/* 🔥 AI Summary */}
                    <b>Summary:</b>
                    <p>{note.summary}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;