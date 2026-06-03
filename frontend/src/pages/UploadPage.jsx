import UploadBox from "../components/UploadBox";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UploadPage() {

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    const handleUpload = async (file) => {

        if (!file) return;

        if (
            file.type !== "application/pdf" &&
            file.type !== "text/plain"
        ) {
            toast.error("Only PDF and TXT files are allowed");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            setLoading(true);

            const res = await axios.post(
                "http://localhost:4000/api/files/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    onUploadProgress: (data) => {

                        const percent = Math.round(
                            (data.loaded * 100) / data.total
                        );

                        setProgress(percent);
                    },
                }
            );

            console.log("Upload Response:", res.data);

            toast.success(
                "File uploaded successfully"
            );
            toast.success("Note created successfully");

            navigate("/notes");

        } catch (err) {

            console.error(err);

            toast.error(
                err.response?.data?.message ||
                "Upload failed"
            );

        } finally {

            setLoading(false);
            setProgress(0);

        }
    };

    return (

        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                    Upload Notes
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Upload PDF or TXT files and let StudyAI process them automatically.
                </p>

            </div>

            {/* CARD */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">

                <UploadBox onUpload={handleUpload} />

                {/* LOADING */}
                {loading && (

                    <div className="mt-8">

                        <div className="flex justify-between items-center mb-3">

                            <h3 className="font-semibold text-gray-700 dark:text-white">
                                Uploading File...
                            </h3>

                            <span className="text-blue-500 font-bold">
                                {progress}%
                            </span>

                        </div>

                        <ProgressBar progress={progress} />

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                            Please wait while your file is being uploaded and processed.
                        </p>

                    </div>

                )}

                {/* INFO SECTION */}
                {!loading && (

                    <div className="mt-8 grid md:grid-cols-2 gap-4">

                        <div className="bg-blue-50 dark:bg-blue-500/10 rounded-2xl p-5">

                            <h3 className="font-bold text-blue-600 mb-2">
                                Supported Files
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                PDF Documents (.pdf)
                                <br />
                                Text Files (.txt)
                            </p>

                        </div>

                        <div className="bg-green-50 dark:bg-green-500/10 rounded-2xl p-5">

                            <h3 className="font-bold text-green-600 mb-2">
                                AI Processing
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Extract notes automatically,
                                generate summaries and ask AI questions.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}