import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const res = await API.post("/auth/login", {
                email,
                password,
            });

            login(res.data.token, res.data.user);

            toast.success("Login successful");

            navigate("/");

        } catch (err) {

            console.log(err.response?.data || err.message);

            toast.error(
                err.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#e9edf3] dark:bg-gray-900 px-4">

            <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 md:p-8 rounded-2xl shadow-md">

                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                    Study<span className="text-blue-500">AI</span>
                </h1>

                <h2 className="text-xl font-semibold text-center mb-1 text-gray-800 dark:text-white">
                    Login
                </h2>

                <p className="text-center text-gray-500 dark:text-gray-300 mb-6 text-sm">
                    Welcome back! Please login to your account.
                </p>

                <form onSubmit={handleLogin}>

                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg px-3 mb-4 bg-gray-50 dark:bg-gray-700">
                        <span className="text-gray-400">📧</span>

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3 bg-transparent outline-none text-gray-800 dark:text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg px-3 mb-4 bg-gray-50 dark:bg-gray-700">
                        <span className="text-gray-400">🔒</span>

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-transparent outline-none text-gray-800 dark:text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-400 hover:opacity-90 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >

                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>

                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>

                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}

                    </button>

                </form>

                <p className="text-center text-gray-500 dark:text-gray-300 text-sm mt-4">
                    New to StudyAI?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 font-medium"
                    >
                        Sign up
                    </Link>
                </p>

            </div>

        </div>
    );
}