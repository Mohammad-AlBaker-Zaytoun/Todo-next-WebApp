"use client";

import { useState, useEffect } from "react";
import { TodoItem } from "@/components/TodoItem";
import Link from "next/link";

type TodoItemType = {
  id: string;
  title: string;
  complete: boolean;
};

type TodoListProps = {
  updateTodoStats: (todos: TodoItemType[]) => void; // Callback to update todos and completed counts
};

export function TodoList({ updateTodoStats }: TodoListProps) {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  // Load todos from Local Storage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todosArray = JSON.parse(storedTodos);
      setTodos(todosArray);
      updateTodoStats(todosArray); // Update stats on initial load
    }
  }, []);

  // Save todos to Local Storage and update stats
  const saveToLocalStorage = (updatedTodos: TodoItemType[]) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    updateTodoStats(updatedTodos); // Update the counts when todos are modified
  };

  // Add a new todo
  const addTodo = () => {
    const title = prompt("Enter the new todo title");
    if (title) {
      const newTodo: TodoItemType = {
        id: Date.now().toString(),
        title,
        complete: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    }
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
    <div className="m-7 mt-12">
      <Link
        href="/new"
        className="border border-gray-300 text-gray-300 px-2 py-1 mb-4 rounded hover:bg-gray-700"
      >
        Add Todo
      </Link>

      {/* Display the Todos */}
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
