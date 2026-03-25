import axios from "axios";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const signup = async (name, email, password) => {
        try {
            const res = axios.post("http://localhost:3000/api/signup", {
                name,
                email,
                password
            });
            if (res.status === 200) {
                alert("Signup successful");
                setUser(res.data.user);
                localStorage.setItem("token", res.data.token);
            } else {
                alert("Signup failed");
            }
        } catch (err) {
            console.error("Signup failed: ", err);
            alert("Could not create account");
        }
    }

    const login = async (email, password) => {
        try {
            const res = axios.post("http://localhost:3000/api/login", {
                email,
                password
            });
            if (res.status === 200) {
                alert("Login successful");
                setUser(res.data.user);
                localStorage.setItem("token", res.data.token);
            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Could not login");
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}