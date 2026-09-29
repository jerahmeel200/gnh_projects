type TodoFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function TodoForm({ value, onChange, onSubmit }: TodoFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Add a new task"
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Add task
      </button>
    </form>
  );
}
