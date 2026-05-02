import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.log("Invalid user data");
                localStorage.removeItem("user"); // cleanup
            }
        }
    }, []);

    // ✅ ADD THIS (IMPORTANT)
    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ✅ custom hook
export const useAuth = () => useContext(AuthContext);