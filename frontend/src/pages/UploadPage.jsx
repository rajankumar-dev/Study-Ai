import UploadBox from "../components/UploadBox";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // (optional for next step)

export default function UploadPage() {

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate(); // (optional)

    const handleUpload = async (file) => {
        if (!file) return;

        // ✅ FILE TYPE VALIDATION
        if (
            file.type !== "application/pdf" &&
            file.type !== "text/plain"
        ) {
            alert("❌ Only PDF and TXT files are allowed");
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

            console.log("✅ Upload Response:", res.data);

            // ✅ SUCCESS MESSAGE
            alert("✅ File uploaded successfully");

            // ✅ NEXT STEP (when noteId comes from backend)
            alert("Note created successfully");
            navigate(`notes/${res.data.noteId}`);


        } catch (err) {
            console.error(err);

            // ✅ ERROR MESSAGE
            alert(err.response?.data?.message || "❌ Upload failed");
        } finally {
            setLoading(false);
            setProgress(0);
        }
    };

    return (
        <div className="p-6">
            <UploadBox onUpload={handleUpload} />

            {loading && (
                <p className="text-center mt-4 text-blue-500">
                    Uploading...
                </p>
            )}

            {progress > 0 && (
                <>
                    <ProgressBar progress={progress} />
                    <p className="text-center text-sm text-gray-500 mt-2">
                        {progress}% uploaded
                    </p>
                </>
            )}
        </div>
    );
}