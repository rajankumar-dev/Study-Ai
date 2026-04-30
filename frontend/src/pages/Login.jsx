import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await API.post("/auth/login", {
            email,
            password,
        });

        login(res.data);
        alert("Login success");
    };

    return (
        <form onSubmit={handleLogin}>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>
    );
};

export default Login;