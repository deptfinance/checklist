import { CalendarDays, Check, Pencil, Trash2, UserRound } from "lucide-react";
import {
  categoryStyles,
  formatDate,
  isOverdue,
  isToday,
  priorityStyles,
  type Task,
} from "@/lib/tasks";

type TaskCardProps = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const overdue = isOverdue(task);
  const dueToday = !task.completed && isToday(task.deadline);

  return (
    <article
      className={`rounded-lg border bg-white p-4 shadow-sm transition hover:border-zinc-300 ${
        task.completed ? "border-zinc-200 opacity-75" : "border-zinc-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
            task.completed
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-zinc-300 bg-white text-transparent hover:border-zinc-500"
          }`}
          title={task.completed ? "Tandai belum selesai" : "Tandai selesai"}
          aria-label={task.completed ? "Tandai belum selesai" : "Tandai selesai"}
        >
          <Check className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`min-w-0 text-base font-semibold text-zinc-950 ${
                task.completed ? "line-through decoration-zinc-400" : ""
              }`}
            >
              {task.title}
            </h3>
            {dueToday ? (
              <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                Deadline hari ini
              </span>
            ) : null}
            {overdue ? (
              <span className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                Terlambat
              </span>
            ) : null}
          </div>

          {task.description ? (
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              {task.description}
            </p>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`rounded-md border px-2 py-1 font-medium ${categoryStyles[task.category]}`}
            >
              {task.category}
            </span>
            <span
              className={`rounded-md border px-2 py-1 font-medium ${priorityStyles[task.priority]}`}
            >
              Prioritas {task.priority}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-medium text-zinc-600">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(task.deadline)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-medium text-zinc-600">
              <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
              {task.createdBy} / update {task.updatedBy}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-md p-2 text-zinc-500 transition hover:bg-rose-50 hover:text-rose-700"
            title="Hapus task"
            aria-label="Hapus task"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
