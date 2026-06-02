import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

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

            alert("✅ Account created successfully");

            navigate("/login");

        } catch (err) {

            console.log(err);

            alert("❌ Signup failed");

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#e9edf3] dark:bg-gray-900 px-4">

            <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 md:p-8 rounded-2xl shadow-md">

                {/* LOGO */}
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                    Study<span className="text-blue-500">AI</span>
                </h1>

                {/* TITLE */}
                <h2 className="text-xl font-semibold text-center mb-1 text-gray-800 dark:text-white">
                    Sign Up
                </h2>

                <p className="text-center text-gray-500 dark:text-gray-300 mb-6 text-sm">
                    Create your StudyAI account.
                </p>

                <form onSubmit={handleSignup}>

                    {/* NAME */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg px-3 mb-4 bg-gray-50 dark:bg-gray-700">

                        <span className="text-gray-400">
                            👤
                        </span>

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    {/* EMAIL */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg px-3 mb-4 bg-gray-50 dark:bg-gray-700">

                        <span className="text-gray-400">
                            📧
                        </span>

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3 bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    {/* PASSWORD */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg px-3 mb-6 bg-gray-50 dark:bg-gray-700">

                        <span className="text-gray-400">
                            🔒
                        </span>

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-400 hover:opacity-90 transition cursor-pointer"
                    >
                        Sign Up
                    </button>

                </form>

                {/* FOOTER */}
                <p className="text-center text-gray-500 dark:text-gray-300 text-sm mt-4">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-500 font-medium"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}