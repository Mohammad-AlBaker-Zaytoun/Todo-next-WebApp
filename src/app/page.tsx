"use client";

import { TodoList } from "@/components/TodoList"; // Import the client component

export default function Home() {
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todos</h1>
      </header>
      {/* Load the TodoList component to display and manage todos */}
      <TodoList />
    </>
  );
}
