import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        className="flex-1 px-6 py-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-white hover:border-purple-300 transition-colors shadow-sm text-lg"
      />
      <button
        type="submit"
        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 transform text-lg"
      >
        ➕ Add
      </button>
    </form>
  );
}
