import { AlertTriangle, CheckCircle2, Circle, ClipboardList } from "lucide-react";
import { isOverdue, type Task } from "@/lib/tasks";

type SummaryCardsProps = {
  tasks: Task[];
};

export function SummaryCards({ tasks }: SummaryCardsProps) {
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const overdue = tasks.filter(isOverdue).length;

  const cards = [
    {
      label: "Total task",
      value: tasks.length,
      icon: ClipboardList,
      tone: "bg-zinc-100 text-zinc-700",
    },
    {
      label: "Selesai",
      value: completed,
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Belum selesai",
      value: pending,
      icon: Circle,
      tone: "bg-sky-50 text-sky-700",
    },
    {
      label: "Terlambat",
      value: overdue,
      icon: AlertTriangle,
      tone: "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan task">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-zinc-500">{card.label}</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-950">
                  {card.value}
                </p>
              </div>
              <div className={`rounded-lg p-2.5 ${card.tone}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
