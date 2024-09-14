"use server";

import { prisma } from "@/db";

// Toggle Todo completion
export async function toggleTodo(id: string, complete: boolean) {
    await prisma.todo.update({
        where: { id },
        data: { complete },
    });
}

// Delete Todo
export async function handleDelete(id: string) {
    await prisma.todo.delete({
        where: { id },
    });
}

// Update Todo
export async function updateTodo(id: string, title: string) {
    await prisma.todo.update({
        where: { id },
        data: { title },
    });
}
