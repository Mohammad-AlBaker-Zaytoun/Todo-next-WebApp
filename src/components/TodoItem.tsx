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
    <li className="flex gap-1 items-center">
      {!isEditing && (
        <>
          <input
            id={id}
            type="checkbox"
            className="cursor-pointer peer"
            defaultChecked={complete}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          <label
            htmlFor={id}
            className="peer-checked:line-through cursor-pointer peer-checked:text-slate-500"
          >
            {title}
          </label>
          <button
            className="ml-2 text-blue-500"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="ml-2 text-red-500"
            onClick={handleDeleteTodo}
          >
            Delete
          </button>
        </>
      )}

      {isEditing && (
        <div className="flex gap-2 items-center">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 px-2 py-1 text-black"
          />
          <button
            className="px-2 py-1 bg-green-500 text-white rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </li>
  );
}
