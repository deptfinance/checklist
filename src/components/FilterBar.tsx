import { CheckCircle2, Circle, Flame, ListFilter, Sun } from "lucide-react";
import { filters, type TaskFilter } from "@/lib/tasks";

const filterIcons = {
  Semua: ListFilter,
  "Hari ini": Sun,
  "Belum selesai": Circle,
  Selesai: CheckCircle2,
  "Prioritas tinggi": Flame,
};

type FilterBarProps = {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
};

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-lg border border-zinc-200 bg-white p-2 shadow-sm">
      {filters.map((filter) => {
        const Icon = filterIcons[filter];
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
            aria-pressed={isActive}
            title={`Filter ${filter}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {filter}
          </button>
        );
      })}
    </div>
  );
}
