import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function TodoPage() {
    const { user, loading } = useAuth();
    const [newTask, setNewTask] = useState("");
    const [todos, setTodos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const editInputRef = useRef(null);
    const userName = user?.name || "Guest";

    const startEditing = (todo) => {
        setEditingId(todo._id);
        setEditText(todo.todoItem);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditText("");
    };

    const saveEdit = async (todoId) => {
        if (!editText.trim()) return;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`http://localhost:3000/api/todo/${todoId}`, {
            todoItem: editText,
            completed: false,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {
            alert("Todo updated successfully");
        }
        setTodos(todos.map((t) =>
            t._id === todoId ? { ...t, todoItem: editText.trim() } : t
        ));
        setEditingId(null);
        setEditText("");
        } catch (err) {
            console.error("Failed to update todo", err)
        }
    };

    const handleEditKeyDown = (e, todoId) => {
        if (e.key === "Enter") {
            e.preventDefault();
            saveEdit(todoId);
        } else if (e.key === "Escape") {
            cancelEditing();
        }
    };

    // Auto-focus the edit input when editing starts
    useEffect(() => {
        if (editingId && editInputRef.current) {
            editInputRef.current.focus();
            editInputRef.current.select();
        }
    }, [editingId]);

    const addTodo = async () => {
        if (!newTask.trim()) return
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:3000/api/todo", {
                todoItem: newTask,
                completed: false
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setTodos([...todos, res.data.todo]);
                setNewTask("");
            }
        } catch (err) {
            console.error("Failed to add todo:", err);
        }
    }

    useEffect(() => {
        const fetchTodos = async () => {
            if (!user) return
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/todos", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.status === 200) {
                    setTodos(res.data.todos);
                }
            } catch (err) {
                console.error("Failed to fetch todos:", err);
            }
        }
        fetchTodos();
    }, [user]);

    const deleteTodo = async (todoId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(`http://localhost:3000/api/todo/${todoId}`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            if (res.status === 200) {
                setTodos(todos.filter((t) => t._id !== todoId));
            }

        } catch (err) {
            console.error("Failed to delete todo!", err);
        }
    }

    return (
        <div className="min-h-screen bg-[#0f0f11] font-sans text-[#fafafa] p-4 sm:p-8">
            <div className="max-w-160 mx-auto flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    {loading ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <div className="h-3.5 w-24 rounded-full bg-[#27272a] animate-pulse" />
                                <div className="h-7 w-40 rounded-lg bg-[#27272a] animate-pulse" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#27272a] animate-pulse" />
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="text-sm text-[#71717a] mb-0.5">Welcome back,</p>
                                <h1 className="text-2xl font-bold tracking-tight">{userName} 👋</h1>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center font-bold text-sm select-none">
                                {userName.charAt(0)}
                            </div>
                        </>
                    )}
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task…"
                        className="flex-1 px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-xl
                            text-[#fafafa] text-sm outline-none placeholder:text-[#3f3f46]
                            transition-[border-color] duration-200 focus:border-[#7c3aed]"
                    />
                    <button
                    onClick={addTodo} 
                    className="px-5 py-3 bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[0.97]
                        text-white text-sm font-semibold rounded-xl border-none cursor-pointer
                        transition-[background,transform] duration-200 whitespace-nowrap">
                        Add Task
                    </button>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest">
                            My Tasks
                        </h2>
                        <span className="text-xs text-[#71717a] bg-[#18181b] border border-[#27272a] px-2.5 py-1 rounded-full">
                            {todos.length} tasks
                        </span>
                    </div>

                    {todos.map((todo, i) => (
                        <div
                            key={todo._id}
                            className={`anim-slide-up flex items-center gap-3 bg-[#18181b]
                                border rounded-xl px-4 py-3.5
                                transition-[border-color] duration-200
                                ${editingId === todo._id
                                    ? "border-[#7c3aed]"
                                    : "border-[#27272a] hover:border-[#3f3f46]"}`}
                            style={{ animationDelay: `${i * 50}ms` }}>
                            <div className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-200
                                ${editingId === todo._id ? "bg-[#a78bfa]" : "bg-[#7c3aed]"}`} />

                            {editingId === todo._id ? (
                                /* ── Editing mode ── */
                                <>
                                    <input
                                        ref={editInputRef}
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onKeyDown={(e) => handleEditKeyDown(e, todo._id)}
                                        className="flex-1 bg-[#0f0f11] border border-[#3f3f46] rounded-lg
                                            px-3 py-1.5 text-sm text-[#fafafa] outline-none
                                            placeholder:text-[#3f3f46]
                                            transition-[border-color] duration-200
                                            focus:border-[#7c3aed]"
                                    />
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => saveEdit(todo._id)}
                                            className="flex items-center gap-1.5 text-xs font-medium
                                                text-[#22c55e] hover:text-[#4ade80] bg-transparent
                                                border border-[#22c55e]/30 hover:border-[#22c55e]
                                                rounded-lg px-3 py-1.5 cursor-pointer
                                                transition-[color,border-color] duration-150">
                                            ✓ Save
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            className="flex items-center gap-1.5 text-xs font-medium
                                                text-[#71717a] hover:text-[#a1a1aa] bg-transparent
                                                border border-[#27272a] hover:border-[#3f3f46]
                                                rounded-lg px-3 py-1.5 cursor-pointer
                                                transition-[color,border-color] duration-150">
                                            ✕ Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                /* ── Display mode ── */
                                <>
                                    <span className="flex-1 text-sm leading-snug">{todo.todoItem}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => startEditing(todo)}
                                            className="flex items-center gap-1.5 text-xs font-medium
                                                text-[#71717a] hover:text-[#a78bfa] bg-transparent
                                                border border-[#27272a] hover:border-[#7c3aed]
                                                rounded-lg px-3 py-1.5 cursor-pointer
                                                transition-[color,border-color] duration-150">
                                            <EditIcon />
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => deleteTodo(todo._id)}
                                            className="flex items-center gap-1.5 text-xs font-medium
                                                text-[#71717a] hover:text-rose-400 bg-transparent
                                                border border-[#27272a] hover:border-rose-500/50
                                                rounded-lg px-3 py-1.5 cursor-pointer
                                                transition-[color,border-color] duration-150">
                                            <DeleteIcon />
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
