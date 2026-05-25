"use client";

import { KeyRound, RefreshCw, UserRound } from "lucide-react";
import { teamMembers, type TeamMember } from "@/lib/tasks";

type TeamAccessBarProps = {
  activeMember: TeamMember | "";
  pin: string;
  syncMode: "loading" | "shared" | "local" | "locked";
  syncMessage: string;
  onMemberChange: (member: TeamMember) => void;
  onPinChange: (pin: string) => void;
  onSync: () => void;
};

export function TeamAccessBar({
  activeMember,
  pin,
  syncMode,
  syncMessage,
  onMemberChange,
  onPinChange,
  onSync,
}: TeamAccessBarProps) {
  const statusLabel = {
    loading: "Menyinkronkan",
    shared: "Shared",
    local: "Lokal",
    locked: "Butuh PIN",
  }[syncMode];

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_170px_160px_auto] lg:items-end">
        <div>
          <p className="text-sm font-medium text-zinc-500">Team mode</p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-950">
            Input bareng 4 anggota
          </h2>
          <p className="mt-1 text-sm text-zinc-500">{syncMessage}</p>
        </div>

        <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="h-4 w-4" aria-hidden="true" />
            Nama anggota
          </span>
          <select
            value={activeMember}
            onChange={(event) => onMemberChange(event.target.value as TeamMember)}
            className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-400 focus:bg-white"
          >
            <option value="">Pilih nama</option>
            {teamMembers.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
          <span className="inline-flex items-center gap-1.5">
            <KeyRound className="h-4 w-4" aria-hidden="true" />
            PIN team
          </span>
          <input
            value={pin}
            onChange={(event) => onPinChange(event.target.value)}
            placeholder="Jika ada"
            type="password"
            className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
          />
        </label>

        <button
          type="button"
          onClick={onSync}
          className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Sync
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
        <span
          className={`rounded-md px-2 py-1 ${
            syncMode === "shared"
              ? "bg-emerald-50 text-emerald-700"
              : syncMode === "locked"
                ? "bg-amber-50 text-amber-700"
                : "bg-zinc-100 text-zinc-700"
          }`}
        >
          Storage: {statusLabel}
        </span>
        {activeMember ? (
          <span className="rounded-md bg-sky-50 px-2 py-1 text-sky-700">
            Aktif: {activeMember}
          </span>
        ) : null}
      </div>
    </section>
  );
}
