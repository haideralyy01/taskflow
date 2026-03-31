import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, [])

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post("http://localhost:3000/api/signup", {
                email,
                password,
                name
            });
            if (res.status === 200) {
                setUser(res.data.user);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                return true;
            } else {
                throw new Error("Signup failed");
            }
        } catch (err) {
            console.error("Signup failed: ", err);
            throw err;
        }
    }

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:3000/api/login", {
                email,
                password
            });
            if (res.status === 200) {
                setUser(res.data.user);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                return true;
            } else {
                throw new Error("Login failed");
            }
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}