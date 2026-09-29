export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  editValue: string;
  onToggle: (id: number) => void;
  onEditStart: (todo: Todo) => void;
  onEditChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
};

export function TodoItem({
  todo,
  isEditing,
  editValue,
  onToggle,
  onEditStart,
  onEditChange,
  onSave,
  onCancel,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition hover:border-slate-300 hover:bg-slate-100">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark task as incomplete" : "Mark task as complete"}
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 bg-white text-transparent"
        }`}
      >
        {todo.completed ? "✓" : ""}
      </button>

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(event) => onEditChange(event.target.value)}
            className="w-full rounded-xl border border-sky-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400"
            autoFocus
          />
        ) : (
          <p
            className={`truncate text-sm font-medium sm:text-base ${
              todo.completed ? "text-slate-400 line-through" : "text-slate-800"
            }`}
          >
            {todo.text}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={onSave}
              className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onEditStart(todo)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
