export const categories = [
  "Administrasi",
  "Keuangan",
  "Dokumen",
  "Follow Up",
  "Lainnya",
] as const;

export const priorities = ["Rendah", "Sedang", "Tinggi"] as const;

export const filters = [
  "Semua",
  "Hari ini",
  "Belum selesai",
  "Selesai",
  "Prioritas tinggi",
] as const;

export type Category = (typeof categories)[number];
export type Priority = (typeof priorities)[number];
export type TaskFilter = (typeof filters)[number];
export type CategoryFilter = "Semua" | Category;

export type Task = {
  id: string;
  projectName: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  deadline: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskInput = Pick<
  Task,
  "projectName" | "title" | "description" | "category" | "priority" | "deadline"
>;

export const categoryStyles: Record<Category, string> = {
  Administrasi: "bg-stone-100 text-stone-700 border-stone-200",
  Keuangan: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Dokumen: "bg-sky-50 text-sky-700 border-sky-200",
  "Follow Up": "bg-amber-50 text-amber-700 border-amber-200",
  Lainnya: "bg-zinc-100 text-zinc-700 border-zinc-200",
};

export const priorityStyles: Record<Priority, string> = {
  Rendah: "bg-zinc-100 text-zinc-700 border-zinc-200",
  Sedang: "bg-blue-50 text-blue-700 border-blue-200",
  Tinggi: "bg-rose-50 text-rose-700 border-rose-200",
};

export const storageKey = "checklist-administrasi.tasks";
export const fallbackProjectName = "Pekerjaan Umum";

export function todayISO() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 10);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function isToday(date: string) {
  return date === todayISO();
}

export function isOverdue(task: Task) {
  return !task.completed && task.deadline < todayISO();
}

export function createTask(input: TaskInput): Task {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    ...input,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizeTasks(tasks: Task[]) {
  return tasks.map((task) => ({
    ...task,
    projectName: task.projectName?.trim() || fallbackProjectName,
  }));
}

export const defaultTasks: Task[] = [
  {
    id: "sample-1",
    projectName: "PEMBAYARAN TERMIN KEDUA RUKO SEBELAH",
    title: "SURAT PERJANJIAN TERMIN DUA",
    description: "Siapkan dokumen perjanjian untuk pembayaran termin kedua.",
    category: "Dokumen",
    priority: "Sedang",
    deadline: todayISO(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    projectName: "PEMBAYARAN TERMIN KEDUA RUKO SEBELAH",
    title: "KWITANSI",
    description: "Buat dan arsipkan kwitansi pembayaran termin kedua.",
    category: "Dokumen",
    priority: "Tinggi",
    deadline: todayISO(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-3",
    projectName: "Administrasi Harian",
    title: "Arsipkan kontrak vendor ke folder bersama",
    description: "Gunakan format nama file yang sudah disepakati.",
    category: "Dokumen",
    priority: "Rendah",
    deadline: todayISO(),
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
