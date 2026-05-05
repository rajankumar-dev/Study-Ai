// components/UploadBox.jsx
import { useState } from "react";

export default function UploadBox({ onUpload }) {
    const [drag, setDrag] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDrag(false);
        const file = e.dataTransfer.files[0];
        onUpload(file);
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed p-10 text-center rounded-xl cursor-pointer 
      ${drag ? "bg-blue-100 border-blue-500" : "bg-gray-50"}`}
        >
            <p className="text-gray-600">
                Drag & drop your file here or click to upload
            </p>
        </div>
    );
}