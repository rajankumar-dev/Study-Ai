import UploadBox from "../components/UploadBox";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import { useState } from "react";

export default function UploadPage() {

    // ✅ ALL hooks must be here (inside component)
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:4000/api/files/upload", // ✅ FIXED
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    onUploadProgress: (data) => {
                        const percent = Math.round((data.loaded * 100) / data.total);
                        setProgress(percent);
                    },
                }
            );

            console.log(res.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setProgress(0); // reset after upload
        }
    };

    return (
        <div className="p-6">
            <UploadBox onUpload={handleUpload} />

            {/* ✅ loading text */}
            {loading && <p className="text-center mt-4">Uploading...</p>}

            {/* ✅ progress bar */}
            {progress > 0 && <ProgressBar progress={progress} />}
        </div>
    );
}