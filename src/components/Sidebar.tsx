import { BriefcaseBusiness, CircleDot, FolderKanban, Tags } from "lucide-react";
import {
  categories,
  type Category,
  type CategoryFilter,
  type ProjectFilter,
  type Task,
} from "@/lib/tasks";

type SidebarProps = {
  tasks: Task[];
  projectNames: string[];
  selectedCategory: CategoryFilter;
  selectedProject: ProjectFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  onSelectProject: (project: ProjectFilter) => void;
};

function countByCategory(tasks: Task[], category: Category) {
  return tasks.filter((task) => task.category === category).length;
}

export function Sidebar({
  tasks,
  projectNames,
  selectedCategory,
  selectedProject,
  onSelectCategory,
  onSelectProject,
}: SidebarProps) {
  return (
    <aside className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:overflow-y-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white">
          <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-950">Admin Desk</p>
          <p className="text-xs text-zinc-500">Checklist kerja</p>
        </div>
      </div>

      <nav aria-label="Projek" className="mb-6">
        <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          <FolderKanban className="h-4 w-4" aria-hidden="true" />
          Projek
        </div>

        <div className="grid gap-1">
          <button
            type="button"
            onClick={() => onSelectProject("Semua")}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
              selectedProject === "Semua"
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
            }`}
          >
            <span>Semua projek</span>
            <span className="text-xs opacity-70">{projectNames.length}</span>
          </button>

          {projectNames.map((projectName) => {
            const projectTasks = tasks.filter(
              (task) => task.projectName === projectName,
            );
            const completed = projectTasks.filter((task) => task.completed).length;
            const progress = projectTasks.length
              ? Math.round((completed / projectTasks.length) * 100)
              : 0;

            return (
              <button
                key={projectName}
                type="button"
                onClick={() => onSelectProject(projectName)}
                className={`rounded-md px-3 py-2 text-left text-sm transition ${
                  selectedProject === projectName
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                <span className="block truncate">{projectName}</span>
                <span className="mt-1 flex items-center justify-between text-xs opacity-70">
                  <span>{projectTasks.length} task</span>
                  <span>{progress}%</span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <nav aria-label="Kategori task">
        <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          <Tags className="h-4 w-4" aria-hidden="true" />
          Kategori
        </div>

        <div className="grid gap-1">
          <button
            type="button"
            onClick={() => onSelectCategory("Semua")}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
              selectedCategory === "Semua"
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
            }`}
          >
            <span>Semua</span>
            <span className="text-xs opacity-70">{tasks.length}</span>
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                selectedCategory === category
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              <span className="flex min-w-0 items-center gap-2">
                <CircleDot className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{category}</span>
              </span>
              <span className="text-xs opacity-70">
                {countByCategory(tasks, category)}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}
