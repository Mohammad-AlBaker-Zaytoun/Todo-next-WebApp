"use client";

import { useState } from "react";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
};

export function TodoItem({
  id,
  title,
  complete,
  toggleTodo,
  onDelete,
  onUpdate,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  // Handle the update action when the user submits the new title
  const handleUpdate = () => {
    onUpdate(id, newTitle);
    setIsEditing(false); // Exit edit mode after updating
  };

  // Handle delete action
  const handleDeleteTodo = () => {
    onDelete(id);
  };

  return (
    <li className="flex gap-3 items-center py-2 text-lg"> {/* Slightly smaller font and padding */}
      {!isEditing && (
        <>
          <input
            id={id}
            type="checkbox"
            className="cursor-pointer peer h-5 w-5"  // Smaller checkbox
            defaultChecked={complete}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          <label
            htmlFor={id}
            className={`peer-checked:line-through cursor-pointer peer-checked:text-slate-500 ${
              complete ? "line-through text-gray-500" : "text-white"
            }`}
          >
            {title}
          </label>
          <button
            className="ml-3 text-blue-500 hover:underline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="ml-3 text-red-500 hover:underline"
            onClick={handleDeleteTodo}
          >
            Delete
          </button>
        </>
      )}

      {isEditing && (
        <div className="flex gap-3 items-center">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 px-2 py-1 text-lg text-black"  // Smaller input
          />
          <button
            className="px-2 py-1 bg-green-500 text-white rounded text-lg"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded text-lg"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </li>
  );
}
