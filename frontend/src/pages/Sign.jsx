import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", {
                name,
                email,
                password,
            });

            alert("Signup successful");
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-2">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Start your AI study journey 🚀
                </p>

                <form onSubmit={handleSignup}>

                    {/* Name */}
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Button */}
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition">
                        Sign Up
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 font-medium">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}