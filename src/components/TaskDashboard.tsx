"use client";

import { useEffect, useMemo, useState } from "react";
import { BellRing, ClipboardList } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { ProjectSection } from "@/components/ProjectSection";
import { ProjectTracker } from "@/components/ProjectTracker";
import { Sidebar } from "@/components/Sidebar";
import { SummaryCards } from "@/components/SummaryCards";
import { TeamAccessBar } from "@/components/TeamAccessBar";
import { TaskForm } from "@/components/TaskForm";
import {
  isTeamMember,
  isOverdue,
  isToday,
  memberStorageKey,
  normalizeTasks,
  pinStorageKey,
  type CategoryFilter,
  type ProjectFilter,
  type Task,
  type TaskFilter,
  type TaskInput,
  type TeamMember,
} from "@/lib/tasks";
import {
  createTeamTask,
  deleteTeamTask,
  fetchTeamTasks,
  toggleTeamTask,
  updateTeamTask,
} from "@/lib/teamApi";

type SyncMode = "loading" | "shared" | "local" | "locked";

export function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("Semua");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Semua");
  const [selectedProject, setSelectedProject] = useState<ProjectFilter>("Semua");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | "">("");
  const [pin, setPin] = useState("");
  const [syncMode, setSyncMode] = useState<SyncMode>("loading");
  const [syncMessage, setSyncMessage] = useState("Menyiapkan data team...");

  useEffect(() => {
    const savedMember = window.localStorage.getItem(memberStorageKey);
    const savedPin = window.localStorage.getItem(pinStorageKey) ?? "";

    if (savedMember && isTeamMember(savedMember)) {
      setActiveMember(savedMember);
    }

    setPin(savedPin);

    void loadSharedTasks(savedPin, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeMember) {
      window.localStorage.setItem(memberStorageKey, activeMember);
    }
  }, [activeMember]);

  useEffect(() => {
    window.localStorage.setItem(pinStorageKey, pin);
  }, [pin]);

  useEffect(() => {
    if (syncMode !== "shared") {
      return;
    }

    const intervalId = window.setInterval(() => {
      void loadSharedTasks(pin, false);
    }, 7000);

    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, syncMode]);

  async function loadSharedTasks(currentPin = pin, showLoading = true) {
    if (showLoading) {
      setSyncMode("loading");
      setSyncMessage("Menyinkronkan data team...");
    }

    try {
      const result = await fetchTeamTasks({ pin: currentPin });
      const normalizedTasks = normalizeTasks(result.tasks);
      setTasks(normalizedTasks);
      setSyncMode("shared");
      setSyncMessage("Data tersimpan bersama dan otomatis update untuk team.");
    } catch (error) {
      const syncError = error as Error & {
        status?: number;
        code?: string;
      };

      if (syncError.status === 401) {
        setSyncMode("locked");
        setSyncMessage("Masukkan PIN team untuk membuka data bersama.");
        return;
      }

      if (syncError.status === 503) {
        setSyncMode("local");
        setSyncMessage(
          "Shared storage belum aktif di Vercel. Input dikunci sampai KV/Redis aktif.",
        );
        setTasks([]);
        return;
      }

      if (showLoading) {
        setSyncMode("local");
        setSyncMessage("Gagal sync ke server. Input dikunci agar data tetap satu.");
        setTasks([]);
      }
    }
  }

  const projectNames = useMemo(
    () =>
      Array.from(new Set(tasks.map((task) => task.projectName))).sort((a, b) =>
        a.localeCompare(b, "id-ID"),
      ),
    [tasks],
  );

  const scopedTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesProject =
        selectedProject === "Semua" || task.projectName === selectedProject;
      const matchesCategory =
        selectedCategory === "Semua" || task.category === selectedCategory;

      return matchesProject && matchesCategory;
    });
  }, [selectedCategory, selectedProject, tasks]);

  const dueTodayTasks = scopedTasks.filter(
    (task) => !task.completed && isToday(task.deadline),
  );
  const overdueTasks = scopedTasks.filter(isOverdue);
  const completedCount = scopedTasks.filter((task) => task.completed).length;
  const progress = scopedTasks.length
    ? Math.round((completedCount / scopedTasks.length) * 100)
    : 0;

  const filteredTasks = useMemo(() => {
    return scopedTasks.filter((task) => {
      if (selectedProject !== "Semua" && task.projectName !== selectedProject) {
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
  }, [activeFilter, scopedTasks, selectedProject]);

  const projectGroups = useMemo(() => {
    const groups = new Map<string, Task[]>();

    filteredTasks.forEach((task) => {
      const group = groups.get(task.projectName) ?? [];
      group.push(task);
      groups.set(task.projectName, group);
    });

    return Array.from(groups.entries())
      .map(([projectName, projectTasks]) => ({
        projectName,
        tasks: projectTasks,
      }))
      .sort((a, b) => a.projectName.localeCompare(b.projectName, "id-ID"));
  }, [filteredTasks]);

  async function handleSubmit(input: TaskInput) {
    if (!activeMember) {
      setSyncMessage("Pilih nama anggota sebelum input atau edit task.");
      return;
    }

    if (syncMode !== "shared") {
      setSyncMessage(
        syncMode === "locked"
          ? "Masukkan PIN team lalu klik Sync sebelum mengubah data."
          : "Shared storage belum aktif. Data tidak boleh disimpan lokal.",
      );
      return;
    }

    if (editingTask) {
      const result = await updateTeamTask(editingTask.id, input, {
        pin,
        member: activeMember,
      });
      setTasks(normalizeTasks(result.tasks));
      setEditingTask(null);
      return;
    }

    const result = await createTeamTask(input, { pin, member: activeMember });
    setTasks(normalizeTasks(result.tasks));
  }

  async function handleToggle(id: string) {
    if (!activeMember) {
      setSyncMessage("Pilih nama anggota sebelum mengubah status task.");
      return;
    }

    if (syncMode !== "shared") {
      setSyncMessage(
        syncMode === "locked"
          ? "Masukkan PIN team lalu klik Sync sebelum mengubah data."
          : "Shared storage belum aktif. Data tidak boleh disimpan lokal.",
      );
      return;
    }

    const task = tasks.find((currentTask) => currentTask.id === id);

    if (!task) {
      return;
    }

    const completed = !task.completed;

    const result = await toggleTeamTask(id, completed, {
      pin,
      member: activeMember,
    });
    setTasks(normalizeTasks(result.tasks));
  }

  async function handleDelete(id: string) {
    if (!activeMember) {
      setSyncMessage("Pilih nama anggota sebelum menghapus task.");
      return;
    }

    if (syncMode !== "shared") {
      setSyncMessage(
        syncMode === "locked"
          ? "Masukkan PIN team lalu klik Sync sebelum menghapus data."
          : "Shared storage belum aktif. Data tidak boleh disimpan lokal.",
      );
      return;
    }

    const result = await deleteTeamTask(id, { pin, member: activeMember });
    setTasks(normalizeTasks(result.tasks));

    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  }

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar
          tasks={tasks}
          projectNames={projectNames}
          selectedCategory={selectedCategory}
          selectedProject={selectedProject}
          onSelectCategory={setSelectedCategory}
          onSelectProject={setSelectedProject}
        />

        <div className="grid gap-5">
          <TeamAccessBar
            activeMember={activeMember}
            pin={pin}
            syncMode={syncMode}
            syncMessage={syncMessage}
            onMemberChange={setActiveMember}
            onPinChange={setPin}
            onSync={() => loadSharedTasks(pin, true)}
          />

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

          <SummaryCards tasks={scopedTasks} />

          <ProjectTracker
            tasks={tasks}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
          />

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
                {projectGroups.length ? (
                  projectGroups.map((project) => (
                    <ProjectSection
                      key={project.projectName}
                      projectName={project.projectName}
                      tasks={project.tasks}
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
                projectNames={projectNames}
                activeMember={activeMember}
                canWrite={syncMode === "shared"}
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
