import { useState } from "react";
import API from "../api/axios";

const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            await API.post("/notes", {
                title,
                content,
            });

            alert("✅ Note created successfully");

            setTitle("");
            setContent("");
        } catch (error) {
            console.log(error);
            alert("❌ Failed to create note");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    Create New Note
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Write and save your study notes with AI support.
                </p>

            </div>

            {/* FORM CARD */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* TITLE */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Note Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Enter note title..."
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* CONTENT */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                            Note Content
                        </label>

                        <textarea
                            rows="12"
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            placeholder="Write your notes here..."
                            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition disabled:opacity-50"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Note"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreateNote;