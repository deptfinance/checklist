import { AlertTriangle, CheckCircle2, Circle, FolderKanban } from "lucide-react";
import { isOverdue, type ProjectFilter, type Task } from "@/lib/tasks";

type ProjectTrackerProps = {
  tasks: Task[];
  selectedProject: ProjectFilter;
  onSelectProject: (project: ProjectFilter) => void;
};

type ProjectSummary = {
  name: string;
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  progress: number;
};

function summarizeProjects(tasks: Task[]): ProjectSummary[] {
  const groups = new Map<string, Task[]>();

  tasks.forEach((task) => {
    const group = groups.get(task.projectName) ?? [];
    group.push(task);
    groups.set(task.projectName, group);
  });

  return Array.from(groups.entries())
    .map(([name, projectTasks]) => {
      const completed = projectTasks.filter((task) => task.completed).length;
      const total = projectTasks.length;

      return {
        name,
        total,
        completed,
        pending: total - completed,
        overdue: projectTasks.filter(isOverdue).length,
        progress: total ? Math.round((completed / total) * 100) : 0,
      };
    })
    .sort((a, b) => {
      if (b.overdue !== a.overdue) {
        return b.overdue - a.overdue;
      }

      return a.name.localeCompare(b.name, "id-ID");
    });
}

export function ProjectTracker({
  tasks,
  selectedProject,
  onSelectProject,
}: ProjectTrackerProps) {
  const projects = summarizeProjects(tasks);

  return (
    <section className="grid gap-3" aria-label="Tracking projek">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-zinc-500">Tracking projek</p>
          <h2 className="text-lg font-semibold text-zinc-950">
            Progress per projek
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onSelectProject("Semua")}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
        >
          Semua projek
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const isActive = selectedProject === project.name;

          return (
            <button
              key={project.name}
              type="button"
              onClick={() => onSelectProject(project.name)}
              className={`rounded-lg border bg-white p-4 text-left shadow-sm transition hover:border-zinc-300 ${
                isActive ? "border-zinc-900 ring-2 ring-zinc-900/10" : "border-zinc-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    <FolderKanban className="h-4 w-4" aria-hidden="true" />
                    Projek
                  </div>
                  <h3 className="break-words text-base font-semibold text-zinc-950">
                    {project.name}
                  </h3>
                </div>
                <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700">
                  {project.progress}%
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-zinc-900 transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 font-medium text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.completed}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-1 font-medium text-sky-700">
                  <Circle className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.pending}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-1 font-medium text-rose-700">
                  <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.overdue}
                </span>
              </div>

              <p className="mt-3 text-xs text-zinc-500">
                {project.total} total task
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
