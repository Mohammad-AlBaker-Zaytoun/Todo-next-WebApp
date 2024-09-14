"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const router = useRouter(); // For navigation after adding a todo
  const [error, setError] = useState<string | null>(null);

  // Create Todo function using Local Storage
  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString();

    // Validation for the title
    if (!title || title.trim().length === 0) {
      setError("Invalid Title");
      return;
    }

    // Fetch existing todos from local storage
    const storedTodos = localStorage.getItem("todos");
    const todos = storedTodos ? JSON.parse(storedTodos) : [];

    // Add new todo
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      complete: false,
    };

    // Save to local storage
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // Redirect back to the home page after adding the todo
    router.push("/");
  };

  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">New</h1>
      </header>

      <form onSubmit={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />

        {error && <p className="text-red-500">{error}</p>} {/* Display error if title is invalid */}

        <div className="flex gap-2 justify-end">
          <Link
            href={".."}
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 
            focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 
            focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
