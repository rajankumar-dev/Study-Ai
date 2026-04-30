import { useState } from "react";
import API from "../api/axios";

const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await API.post("/notes", { title, content });

        alert("Note created");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)}
            />

            <button type="submit">Create</button>
        </form>
    );
};

export default CreateNote;