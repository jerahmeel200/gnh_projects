"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterTabs, type TodoFilter } from "./filter-tabs";
import { StatCard } from "./stat-card";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";
import type { Todo } from "./todo-item";

const STORAGE_KEY = "todo-flow-items";

function readStoredTodos(): Todo[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedTodos = window.localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(savedTodos) as Todo[];

    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(readStoredTodos);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  const addTask = () => {
    const trimmedTask = taskInput.trim();

    if (!trimmedTask) {
      return;
    }

    setTodos((currentTodos) => [
      {
        id: Date.now(),
        text: trimmedTask,
        completed: false,
      },
      ...currentTodos,
    ]);
    setTaskInput("");
  };

  const toggleTask = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = () => {
    const trimmedText = editingText.trim();

    if (!trimmedText || editingId === null) {
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === editingId ? { ...todo, text: trimmedText } : todo,
      ),
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <header className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-8 text-white sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Productivity
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Todo Flow</h1>
              <p className="text-sm text-slate-300">Stay on top of your day.</p>
            </div>
          </header>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="Total tasks" value={todos.length} />
              <StatCard label="Completed" value={completedCount} tone="success" />
            </div>

            <TodoForm
              value={taskInput}
              onChange={setTaskInput}
              onSubmit={addTask}
            />

            <div className="flex justify-end">
              <FilterTabs value={filter} onChange={setFilter} />
            </div>

            <TodoList
              todos={filteredTodos}
              editingId={editingId}
              editValue={editingText}
              onToggle={toggleTask}
              onEditStart={startEditing}
              onEditChange={setEditingText}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
