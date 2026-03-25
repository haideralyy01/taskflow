import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"

export default function AuthPage() {
    const [mode, setMode] = useState("login"); // "login" | "signup"
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, signup} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || (!name && mode !== "login")) {
            alert("Please fill in all fields");
            return;
        }

        try {
            if (mode === "login") {
                await login(email, password);
            } else {
                await signup(name, email, password);
            }
            navigate("/todo");
        } catch (err) {
            console.error("Auth failed:", err);
            alert("Authentication error");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f11] font-sans p-4">
            <div className="w-full max-w-100 bg-[#18181b] border border-[#27272a] rounded-2xl px-8 py-9 flex flex-col gap-6">

                {/* Brand */}
                <div className="flex items-center gap-2">
                    <span className="text-[1.4rem] text-[#7c3aed]">✦</span>
                    <span className="text-[1.2rem] font-bold text-[#fafafa] tracking-tight">
                        TaskFlow
                    </span>
                </div>

                {/* Tabs */}
                <div className="flex bg-[#09090b] rounded-[10px] p-1 gap-1">
                    {["login", "signup"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setMode(tab)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg cursor-pointer border-none
                                transition-[background,color] duration-200
                                ${mode === tab
                                    ? "bg-[#27272a] text-[#fafafa]"
                                    : "bg-transparent text-[#71717a]"
                                }`}
                        >
                            {tab === "login" ? "Login" : "Sign Up"}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {mode === "signup" && (
                        <div className="flex flex-col gap-[0.35rem] anim-fade-slide">
                            <label
                                htmlFor="name"
                                className="text-[0.8rem] font-medium text-[#a1a1aa]"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                                className="px-3.5 py-2.5 bg-[#09090b] border border-[#27272a]
                                    rounded-lg text-[#fafafa] text-[0.9rem] outline-none
                                    transition-[border-color] duration-200
                                    placeholder:text-[#3f3f46]
                                    focus:border-[#7c3aed]"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-[0.35rem]">
                        <label
                            htmlFor="email"
                            className="text-[0.8rem] font-medium text-[#a1a1aa]"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="px-3.5 py-2.5 bg-[#09090b] border border-[#27272a]
                                rounded-lg text-[#fafafa] text-[0.9rem] outline-none
                                transition-[border-color] duration-200
                                placeholder:text-[#3f3f46]
                                focus:border-[#7c3aed]"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.35rem]">
                        <label
                            htmlFor="password"
                            className="text-[0.8rem] font-medium text-[#a1a1aa]"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="px-3.5 py-2.5 bg-[#09090b] border border-[#27272a]
                                rounded-lg text-[#fafafa] text-[0.9rem] outline-none
                                transition-[border-color] duration-200
                                placeholder:text-[#3f3f46]
                                focus:border-[#7c3aed]"
                        />
                    </div>

                    {mode === "login" && (
                        <div className="text-right -mt-1">
                            <a
                                href="#"
                                className="text-[0.78rem] text-[#7c3aed] no-underline hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                    )}

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="mt-1 py-[0.7rem] border-none rounded-lg bg-[#7c3aed] text-white
                            text-[0.9rem] font-semibold cursor-pointer
                            transition-[background,transform] duration-200
                            hover:bg-[#6d28d9]
                            active:scale-[0.98]"
                    >
                        {mode === "login" ? "Sign In" : "Create Account"}
                    </button>
                </form>

                {/* Switch link */}
                <p className="text-center text-[0.82rem] text-[#71717a] m-0">
                    {mode === "login" ? (
                        <>
                            Don&apos;t have an account?{" "}
                            <button
                                className="bg-none border-none text-[#7c3aed] text-[0.82rem] font-medium
                                    cursor-pointer p-0 hover:underline"
                                onClick={() => setMode("signup")}
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                className="bg-none border-none text-[#7c3aed] text-[0.82rem] font-medium
                                    cursor-pointer p-0 hover:underline"
                                onClick={() => setMode("login")}
                            >
                                Log in
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}