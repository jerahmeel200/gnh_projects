export type TodoFilter = "all" | "active" | "completed";

type FilterTabsProps = {
  value: TodoFilter;
  onChange: (value: TodoFilter) => void;
};

const filters: { label: string; value: TodoFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export function FilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <div className="inline-flex w-full flex-wrap gap-2 rounded-full border border-slate-200 bg-slate-100 p-1 sm:w-auto">
      {filters.map((filter) => {
        const isActive = value === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
