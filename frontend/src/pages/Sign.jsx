import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#e9edf3]">

            <div className="bg-white w-[400px] p-8 rounded-2xl shadow-md">

                {/* Logo */}
                <h1 className="text-3xl font-bold text-center mb-4">
                    Study<span className="text-blue-500">AI</span>
                </h1>

                {/* Title */}
                <h2 className="text-xl font-semibold text-center mb-1">
                    Sign Up
                </h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                    Create your StudyAI account.
                </p>

                <form onSubmit={handleSignup}>

                    {/* Name */}
                    <div className="flex items-center border rounded-lg px-3 mb-4 bg-gray-50">
                        <span className="text-gray-400">👤</span>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 bg-transparent outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex items-center border rounded-lg px-3 mb-4 bg-gray-50">
                        <span className="text-gray-400">📧</span>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3 bg-transparent outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center border rounded-lg px-3 mb-6 bg-gray-50">
                        <span className="text-gray-400">🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-transparent outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Button */}
                    <button className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-400 hover:opacity-90 transition">
                        Sign Up
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 font-medium">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}