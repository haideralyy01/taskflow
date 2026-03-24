import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

const todos = [
    { id: 1, text: "Design the dashboard layout" },
    { id: 2, text: "Set up authentication flow" },
    { id: 3, text: "Connect backend API endpoints" },
    { id: 4, text: "Write unit tests for core modules" },
];

export default function TodoPage() {
    const userName = "Haider Ali";

    return (
        <div className="min-h-screen bg-[#0f0f11] font-sans text-[#fafafa] p-4 sm:p-8">
            <div className="max-w-160 mx-auto flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-[#71717a] mb-0.5">Welcome back,</p>
                        <h1 className="text-2xl font-bold tracking-tight">{userName} 👋</h1>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center font-bold text-sm select-none">
                        {userName.charAt(0)}
                    </div>
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Add a new task…"
                        className="flex-1 px-4 py-3 bg-[#18181b] border border-[#27272a] rounded-xl
                            text-[#fafafa] text-sm outline-none placeholder:text-[#3f3f46]
                            transition-[border-color] duration-200 focus:border-[#7c3aed]"
                    />
                    <button className="px-5 py-3 bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[0.97]
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
                            key={todo.id}
                            className="anim-slide-up flex items-center gap-3 bg-[#18181b]
                                border border-[#27272a] rounded-xl px-4 py-3.5
                                hover:border-[#3f3f46] transition-[border-color] duration-200"
                            style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="w-2 h-2 rounded-full bg-[#7c3aed] shrink-0" />
                            <span className="flex-1 text-sm leading-snug">{todo.text}</span>
                            <div className="flex items-center gap-2 shrink-0">
                                <button className="flex items-center gap-1.5 text-xs font-medium
                                    text-[#71717a] hover:text-[#a78bfa] bg-transparent
                                    border border-[#27272a] hover:border-[#7c3aed]
                                    rounded-lg px-3 py-1.5 cursor-pointer
                                    transition-[color,border-color] duration-150">
                                    <EditIcon />
                                    Edit
                                </button>
                                <button className="flex items-center gap-1.5 text-xs font-medium
                                    text-[#71717a] hover:text-rose-400 bg-transparent
                                    border border-[#27272a] hover:border-rose-500/50
                                    rounded-lg px-3 py-1.5 cursor-pointer
                                    transition-[color,border-color] duration-150">
                                    <DeleteIcon />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
