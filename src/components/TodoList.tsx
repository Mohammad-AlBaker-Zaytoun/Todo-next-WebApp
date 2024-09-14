"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // For navigation to the /new route
import { TodoItem } from "@/components/TodoItem"; // Import the TodoItem component

type TodoItemType = {
  id: string;
  title: string;
  complete: boolean;
};

export function TodoList() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  // Load todos from Local Storage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to Local Storage
  const saveToLocalStorage = (updatedTodos: TodoItemType[]) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Toggle the completion status of a todo
  const toggleTodo = (id: string, complete: boolean) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  // Update a todo's title
  const updateTodo = (id: string, newTitle: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  return (
    <div>
      <Link
        href="/new"
        className="border border-gray-300 text-gray-300 px-2 py-1 mb-4 rounded hover:bg-gray-700"
      >
        Add Todo
      </Link>

      <ul className="mt-5">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            complete={todo.complete}
            toggleTodo={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
}
