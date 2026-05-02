import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext"; // ✅ add this

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth(); // ✅ get login function

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });

            console.log(res.data);

            login(res.data.token, res.data.user);

            navigate("/");
        } catch (err) {
            console.log(err.response?.data || err.message)
            alert("Login failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#e9edf3]">

            <div className="bg-white w-[400px] p-8 rounded-2xl shadow-md">

                <h1 className="text-3xl font-bold text-center mb-4">
                    Study<span className="text-blue-500">AI</span>
                </h1>

                <h2 className="text-xl font-semibold text-center mb-1">
                    Login
                </h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                    Welcome back! Please login to our account.
                </p>

                <form onSubmit={handleLogin}>

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

                    <div className="flex items-center border rounded-lg px-3 mb-4 bg-gray-50">
                        <span className="text-gray-400">🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-transparent outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-400 hover:opacity-90 transition">
                        Login
                    </button>

                </form>

                <p className="text-center text-gray-500 text-sm mt-4">
                    New to StudyAI?{" "}
                    <Link to="/signup" className="text-blue-500 font-medium">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
}