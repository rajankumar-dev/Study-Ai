// components/UploadBox.jsx

import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function UploadBox({ onUpload }) {

    const [drag, setDrag] = useState(false);

    const fileRef = useRef();

    const handleDrop = (e) => {

        e.preventDefault();

        setDrag(false);

        const file = e.dataTransfer.files[0];

        onUpload(file);

    };

    const handleFileSelect = (e) => {

        const file = e.target.files[0];

        if (file) {

            onUpload(file);

        }
    };

    return (

        <>

            {/* HIDDEN INPUT */}
            <input
                type="file"
                accept=".pdf,.txt"
                ref={fileRef}
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* DROP AREA */}
            <div
                onClick={() => fileRef.current.click()}

                onDragOver={(e) => {

                    e.preventDefault();

                    setDrag(true);

                }}

                onDragLeave={() => setDrag(false)}

                onDrop={handleDrop}

                className={`rounded-3xl p-14 text-center cursor-pointer transition-all duration-200
        
                ${drag
                        ? "bg-blue-50 border-2 border-dashed border-blue-500 scale-[1.01]"
                        : "bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }`}
            >

                {/* ICON */}
                <div className="flex justify-center mb-5">

                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

                        <FaCloudUploadAlt className="text-5xl text-blue-500" />

                    </div>

                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">

                    Drag & Drop Files Here

                </h2>

                {/* SUBTITLE */}
                <p className="text-gray-500 text-base">

                    or click to upload your study notes

                </p>

                {/* FILE TYPES */}
                <p className="text-sm text-gray-400 mt-6">

                    Supported formats: PDF, TXT

                </p>

            </div>

        </>
    );
}