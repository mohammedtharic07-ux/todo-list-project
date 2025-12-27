import { useState, useEffect } from "react";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Failed to load todos", error);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter and search logic
  let filteredTodos = todos;

  if (filter === "active") {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  } else if (filter === "completed") {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  if (searchTerm) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn flex-shrink-0">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">My Todo List</h1>
          <p className="text-gray-600 text-lg">Stay productive and organized ✨</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100 backdrop-blur-sm h-full flex flex-col">
          {/* Stats */}
          <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white p-10">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform">
                <p className="text-5xl font-bold drop-shadow-lg">{todos.length}</p>
                <p className="text-purple-100 text-base font-semibold mt-2">Total Tasks</p>
              </div>
              <div className="transform hover:scale-105 transition-transform">
                <p className="text-5xl font-bold drop-shadow-lg">{activeCount}</p>
                <p className="text-blue-100 text-base font-semibold mt-2">Active</p>
              </div>
              <div className="transform hover:scale-105 transition-transform">
                <p className="text-5xl font-bold drop-shadow-lg">{completedCount}</p>
                <p className="text-cyan-100 text-base font-semibold mt-2">Completed</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 border-b border-purple-100">
            <TodoForm addTodo={addTodo} />
          </div>

          {/* Search Section */}
          <div className="px-8 pt-6 pb-4">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors placeholder-gray-400 text-lg"
            />
          </div>

          {/* Filter Buttons */}
          <div className="px-8 py-6 flex gap-4 border-b border-purple-100 bg-gradient-to-b from-white to-gray-50">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 text-base ${
                filter === "all"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow"
              }`}
            >
              📋 All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 text-base ${
                filter === "active"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow"
              }`}
            >
              ⚡ Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 text-base ${
                filter === "completed"
                  ? "bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow"
              }`}
            >
              ✅ Completed
            </button>
          </div>

          {/* Todo List */}
          <div className="p-6 flex-1 overflow-y-auto min-h-0">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {todos.length === 0
                    ? "No tasks yet. Add one to get started! 🚀"
                    : "No tasks match your search."}
                </p>
              </div>
            ) : (
              <>
                <TodoList
                  todos={filteredTodos}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              </>
            )}
          </div>

          {/* Footer Actions */}
          {todos.length > 0 && (
            <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-cyan-50 border-t-2 border-purple-100 flex justify-between items-center">
              <span className="text-base font-semibold text-gray-700">
                🎯 {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
              </span>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-base text-red-500 hover:text-red-700 font-bold transition-all transform hover:scale-105 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg"
                >
                  🗑️ Clear completed
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-600 text-base animate-fadeIn">
          <p>✨ © 2025 Todo App. Built with React & Vite ✨</p>
        </div>
      </div>
    </div>
  );
}

