import { useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const TODOS_KEY = 'deeros_todos';

function loadTodos(): Todo[] {
    try {
        return JSON.parse(localStorage.getItem(TODOS_KEY) ?? '[]');
    } catch {
        return [];
    }
}

function saveTodos(todos: Todo[]) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>(loadTodos);
    const [input, setInput] = useState('');

    const updateTodos = (next: Todo[]) => {
        setTodos(next);
        saveTodos(next);
    };

    const addTodo = () => {
        const text = input.trim();

        if (!text) return;

        updateTodos([
            ...todos,
            {
                id: Date.now(),
                text,
                completed: false,
            },
        ]);

        setInput('');
    };

    const toggleTodo = (id: number) => {
        updateTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id: number) => {
        updateTodos(todos.filter((todo) => todo.id !== id));
    };

    const remaining = todos.filter((todo) => !todo.completed).length;

    return (
        <div className="flex h-full flex-col bg-deer-bg text-deer-primary p-5">
            <div className="mb-4 flex items-baseline justify-between">
                <h1 className="text-xl font-semibold">todo list</h1>
                {todos.length > 0 && (
                    <span className="text-xs opacity-50">
                        {remaining} left
                    </span>
                )}
            </div>

            <div className="mb-4 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') addTodo();
                    }}
                    placeholder="add new task"
                    className="flex-1 rounded-deer-xl border border-deer-border bg-deer-surface px-4 py-2.5 text-sm outline-none placeholder:text-deer-primary/40 focus:border-moss"
                />

                <button
                    onClick={addTodo}
                    className="flex items-center justify-center rounded-deer-xl bg-moss px-4 text-white transition hover:bg-moss-hover"
                >
                    <Plus size={18} />
                </button>
            </div>

            <div className="flex-1 space-y-2 overflow-auto">
                {todos.length === 0 && (
                    <div className="mt-16 text-center text-sm opacity-40">
                        chill, there is nothing to do
                    </div>
                )}

                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="group flex items-center gap-3 rounded-deer-xl border border-deer-border bg-deer-surface px-3 py-2.5 transition hover:border-moss/40"
                    >
                        <button
                            onClick={() => toggleTodo(todo.id)}
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                                todo.completed
                                    ? 'border-moss bg-moss text-white'
                                    : 'border-deer-primary/30'
                            }`}
                        >
                            {todo.completed && <Check size={12} />}
                        </button>

                        <span
                            className={`flex-1 truncate text-sm ${
                                todo.completed
                                    ? 'opacity-40 line-through'
                                    : ''
                            }`}
                        >
                            {todo.text}
                        </span>

                        <button
                            onClick={() => removeTodo(todo.id)}
                            className="rounded-lg p-1.5 opacity-0 transition hover:bg-deer-bg group-hover:opacity-60 hover:!opacity-100"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
