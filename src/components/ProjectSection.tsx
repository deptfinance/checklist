import { FolderKanban } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { type Task } from "@/lib/tasks";

type ProjectSectionProps = {
  projectName: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export function ProjectSection({
  projectName,
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: ProjectSectionProps) {
  const completed = tasks.filter((task) => task.completed).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <section className="grid gap-3">
      <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
            <FolderKanban className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Projek
            </p>
            <h2 className="mt-1 break-words text-lg font-semibold text-zinc-950">
              {projectName}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {completed} dari {tasks.length} task selesai
            </p>
          </div>
        </div>

        <div className="w-full sm:w-40">
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-zinc-500">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full rounded-full bg-zinc-900 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
