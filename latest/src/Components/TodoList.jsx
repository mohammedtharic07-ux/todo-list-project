import { useState } from "react";

export default function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (id, currentText) => {
    setEditingId(id);
    setEditValue(currentText);
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      editTodo(id, editValue);
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  if (!todos || todos.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-purple-50 hover:to-cyan-50 transition-all group border border-gray-200 hover:border-purple-200 shadow-sm hover:shadow-md"
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="w-7 h-7 text-purple-500 rounded-lg focus:ring-2 focus:ring-purple-500 cursor-pointer accent-purple-500"
          />

          {/* Todo Text or Edit Input */}
          {editingId === todo.id ? (
            <div className="flex-1 flex gap-3">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(todo.id);
                  if (e.key === "Escape") cancelEdit();
                }}
              />
              <button
                onClick={() => saveEdit(todo.id)}
                className="px-4 py-3 text-base bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                ✅ Save
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-3 text-base bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
              >
                ❌ Cancel
              </button>
            </div>
          ) : (
            <span
              className={`flex-1 cursor-pointer select-none text-xl font-medium ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
          )}

          {/* Action Buttons */}
          {editingId !== todo.id && (
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEdit(todo.id, todo.text)}
                className="px-4 py-3 text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                title="Edit task"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-4 py-3 text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                title="Delete task"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
