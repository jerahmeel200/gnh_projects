import { Todo, TodoItem } from "./todo-item";

type TodoListProps = {
  todos: Todo[];
  editingId: number | null;
  editValue: string;
  onToggle: (id: number) => void;
  onEditStart: (todo: Todo) => void;
  onEditChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
};

export function TodoList({
  todos,
  editingId,
  editValue,
  onToggle,
  onEditStart,
  onEditChange,
  onSave,
  onCancel,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-lg font-medium text-slate-700">No tasks yet</p>
        <p className="mt-1 text-sm text-slate-500">Add your first task to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          editValue={editValue}
          onToggle={onToggle}
          onEditStart={onEditStart}
          onEditChange={onEditChange}
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
