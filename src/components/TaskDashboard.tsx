"use client";

import { useEffect, useMemo, useState } from "react";
import { BellRing, ClipboardList } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { Sidebar } from "@/components/Sidebar";
import { SummaryCards } from "@/components/SummaryCards";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import {
  createTask,
  defaultTasks,
  isOverdue,
  isToday,
  storageKey,
  type CategoryFilter,
  type Task,
  type TaskFilter,
  type TaskInput,
} from "@/lib/tasks";

export function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("Semua");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Semua");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = window.localStorage.getItem(storageKey);

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks) as Task[]);
      } catch {
        setTasks(defaultTasks);
      }
    } else {
      setTasks(defaultTasks);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [isLoaded, tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const dueTodayTasks = tasks.filter(
    (task) => !task.completed && isToday(task.deadline),
  );
  const overdueTasks = tasks.filter(isOverdue);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesCategory =
        selectedCategory === "Semua" || task.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (activeFilter === "Hari ini") {
        return isToday(task.deadline);
      }

      if (activeFilter === "Belum selesai") {
        return !task.completed;
      }

      if (activeFilter === "Selesai") {
        return task.completed;
      }

      if (activeFilter === "Prioritas tinggi") {
        return task.priority === "Tinggi";
      }

      return true;
    });
  }, [activeFilter, selectedCategory, tasks]);

  function handleSubmit(input: TaskInput) {
    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...input, updatedAt: new Date().toISOString() }
            : task,
        ),
      );
      setEditingTask(null);
      return;
    }

    setTasks((currentTasks) => [createTask(input), ...currentTasks]);
  }

  function handleToggle(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }

  function handleDelete(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));

    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  }

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar
          tasks={tasks}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid gap-5">
          <header className="rounded-lg border border-zinc-200 bg-white px-5 py-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  Dashboard harian
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-zinc-950 sm:text-3xl">
                  Checklist Kerja Administrasi
                </h1>
              </div>

              <div className="min-w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 lg:min-w-[280px]">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-600">
                    Progress selesai
                  </span>
                  <span className="font-semibold text-zinc-950">
                    {progress}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200">
                  <div
                    className="h-full rounded-full bg-zinc-900 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </header>

          <SummaryCards tasks={tasks} />

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div className="grid gap-4">
              <FilterBar
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />

              <div className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-zinc-700" aria-hidden="true" />
                  <h2 className="text-base font-semibold text-zinc-950">
                    Reminder
                  </h2>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <p className="text-sm font-semibold text-amber-800">
                      Deadline hari ini
                    </p>
                    <p className="mt-1 text-sm text-amber-700">
                      {dueTodayTasks.length
                        ? `${dueTodayTasks.length} task perlu diselesaikan hari ini.`
                        : "Tidak ada task yang jatuh tempo hari ini."}
                    </p>
                  </div>

                  <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
                    <p className="text-sm font-semibold text-rose-800">
                      Sudah lewat deadline
                    </p>
                    <p className="mt-1 text-sm text-rose-700">
                      {overdueTasks.length
                        ? `${overdueTasks.length} task sudah terlambat.`
                        : "Tidak ada task yang terlambat."}
                    </p>
                  </div>
                </div>
              </div>

              <section className="grid gap-3" aria-label="Daftar task">
                {filteredTasks.length ? (
                  filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={handleToggle}
                      onEdit={setEditingTask}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
                    <ClipboardList
                      className="mx-auto h-8 w-8 text-zinc-400"
                      aria-hidden="true"
                    />
                    <h2 className="mt-3 text-base font-semibold text-zinc-950">
                      Belum ada task di tampilan ini
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      Tambahkan task baru atau ubah filter yang aktif.
                    </p>
                  </div>
                )}
              </section>
            </div>

            <div className="xl:sticky xl:top-5">
              <TaskForm
                editingTask={editingTask}
                onSubmit={handleSubmit}
                onCancelEdit={() => setEditingTask(null)}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
