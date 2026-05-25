"use client";

import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";
import {
  categories,
  priorities,
  todayISO,
  type Task,
  type TaskInput,
} from "@/lib/tasks";

type TaskFormProps = {
  editingTask: Task | null;
  projectNames: string[];
  onSubmit: (task: TaskInput) => void;
  onCancelEdit: () => void;
};

const emptyForm: TaskInput = {
  projectName: "",
  title: "",
  description: "",
  category: "Administrasi",
  priority: "Sedang",
  deadline: todayISO(),
};

export function TaskForm({
  editingTask,
  projectNames,
  onSubmit,
  onCancelEdit,
}: TaskFormProps) {
  const [form, setForm] = useState<TaskInput>(emptyForm);

  useEffect(() => {
    if (!editingTask) {
      setForm({ ...emptyForm, deadline: todayISO() });
      return;
    }

    setForm({
      projectName: editingTask.projectName,
      title: editingTask.title,
      description: editingTask.description,
      category: editingTask.category,
      priority: editingTask.priority,
      deadline: editingTask.deadline,
    });
  }, [editingTask]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.projectName.trim() || !form.title.trim()) {
      return;
    }

    onSubmit({
      ...form,
      projectName: form.projectName.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
    });

    if (!editingTask) {
      setForm({ ...emptyForm, deadline: todayISO() });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-zinc-950">
            {editingTask ? "Edit task" : "Tambah task"}
          </h2>
          <p className="text-sm text-zinc-500">
            Kelompokkan task berdasarkan projek.
          </p>
        </div>
        {editingTask ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            title="Batalkan edit"
            aria-label="Batalkan edit"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="grid gap-3">
        <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
          Nama projek
          <input
            value={form.projectName}
            list="project-options"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                projectName: event.target.value,
              }))
            }
            placeholder="Contoh: PEMBAYARAN TERMIN KEDUA RUKO SEBELAH"
            className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
            required
          />
          <datalist id="project-options">
            {projectNames.map((projectName) => (
              <option key={projectName} value={projectName} />
            ))}
          </datalist>
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
          Nama task
          <input
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
            placeholder="Contoh: SURAT PERJANJIAN TERMIN DUA"
            className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
            required
          />
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
          Catatan
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            placeholder="Detail singkat pekerjaan"
            rows={3}
            className="resize-none rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Kategori
            <select
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  category: event.target.value as TaskInput["category"],
                }))
              }
              className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-400 focus:bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Prioritas
            <select
              value={form.priority}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  priority: event.target.value as TaskInput["priority"],
                }))
              }
              className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-400 focus:bg-white"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Deadline
            <input
              type="date"
              value={form.deadline}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  deadline: event.target.value,
                }))
              }
              className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-400 focus:bg-white"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-1 flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          {editingTask ? (
            <Save className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Plus className="h-4 w-4" aria-hidden="true" />
          )}
          {editingTask ? "Simpan perubahan" : "Tambah task"}
        </button>
      </div>
    </form>
  );
}
