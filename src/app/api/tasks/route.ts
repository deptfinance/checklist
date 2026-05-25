import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import {
  createTask,
  defaultTasks,
  isTeamMember,
  normalizeTasks,
  type Task,
  type TaskInput,
  type TeamMember,
} from "@/lib/tasks";

const sharedStorageKey = "checklist-administrasi:tasks";

type MutationBody = {
  id?: string;
  input?: TaskInput;
  completed?: boolean;
  member?: string;
};

function sharedStorageConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function pinIsValid(request: NextRequest) {
  const expectedPin = process.env.TEAM_PIN?.trim();

  if (!expectedPin) {
    return true;
  }

  return request.headers.get("x-team-pin") === expectedPin;
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function requireAccess(request: NextRequest) {
  if (!sharedStorageConfigured()) {
    return json(
      {
        error: "SHARED_STORAGE_NOT_CONFIGURED",
        message:
          "Shared storage belum aktif. Hubungkan Vercel KV/Redis dan set env KV_REST_API_URL serta KV_REST_API_TOKEN.",
      },
      503,
    );
  }

  if (!pinIsValid(request)) {
    return json(
      {
        error: "PIN_REQUIRED",
        message: "PIN team diperlukan.",
        pinRequired: true,
      },
      401,
    );
  }

  return null;
}

function requireMember(member: string | undefined): TeamMember | NextResponse {
  if (!member || !isTeamMember(member)) {
    return json(
      {
        error: "INVALID_MEMBER",
        message: "Pilih anggota: Dhea, Delia, Adelia, atau Erika.",
      },
      400,
    );
  }

  return member;
}

async function readTasks() {
  const tasks = await kv.get<Task[]>(sharedStorageKey);

  if (!tasks?.length) {
    await kv.set(sharedStorageKey, defaultTasks);
    return defaultTasks;
  }

  const normalizedTasks = normalizeTasks(tasks);
  await kv.set(sharedStorageKey, normalizedTasks);
  return normalizedTasks;
}

async function writeTasks(tasks: Task[]) {
  const normalizedTasks = normalizeTasks(tasks);
  await kv.set(sharedStorageKey, normalizedTasks);
  return normalizedTasks;
}

export async function GET(request: NextRequest) {
  const accessError = requireAccess(request);

  if (accessError) {
    return accessError;
  }

  const tasks = await readTasks();
  return json({ tasks, shared: true, pinRequired: Boolean(process.env.TEAM_PIN) });
}

export async function POST(request: NextRequest) {
  const accessError = requireAccess(request);

  if (accessError) {
    return accessError;
  }

  const body = (await request.json()) as MutationBody;
  const member = requireMember(body.member);

  if (member instanceof NextResponse) {
    return member;
  }

  const input = body.input;

  if (!input?.projectName?.trim() || !input.title?.trim()) {
    return json({ error: "INVALID_TASK" }, 400);
  }

  const tasks = await readTasks();
  const createdTask = createTask(input, member);
  const nextTasks = await writeTasks([createdTask, ...tasks]);

  return json({ task: createdTask, tasks: nextTasks });
}

export async function PUT(request: NextRequest) {
  const accessError = requireAccess(request);

  if (accessError) {
    return accessError;
  }

  const body = (await request.json()) as MutationBody;
  const member = requireMember(body.member);

  if (member instanceof NextResponse) {
    return member;
  }

  const input = body.input;

  if (!body.id || !input?.projectName?.trim() || !input.title?.trim()) {
    return json({ error: "INVALID_TASK" }, 400);
  }

  const tasks = await readTasks();
  const nextTasks = await writeTasks(
    tasks.map((task) =>
      task.id === body.id
        ? {
            ...task,
            ...input,
            updatedBy: member,
            updatedAt: new Date().toISOString(),
          }
        : task,
    ),
  );

  return json({ tasks: nextTasks });
}

export async function PATCH(request: NextRequest) {
  const accessError = requireAccess(request);

  if (accessError) {
    return accessError;
  }

  const body = (await request.json()) as MutationBody;
  const member = requireMember(body.member);

  if (member instanceof NextResponse) {
    return member;
  }

  if (!body.id || typeof body.completed !== "boolean") {
    return json({ error: "INVALID_TASK" }, 400);
  }

  const tasks = await readTasks();
  const nextTasks = await writeTasks(
    tasks.map((task) =>
      task.id === body.id
        ? {
            ...task,
            completed: body.completed ?? task.completed,
            updatedBy: member,
            updatedAt: new Date().toISOString(),
          }
        : task,
    ),
  );

  return json({ tasks: nextTasks });
}

export async function DELETE(request: NextRequest) {
  const accessError = requireAccess(request);

  if (accessError) {
    return accessError;
  }

  const member = requireMember(request.headers.get("x-team-member") ?? undefined);

  if (member instanceof NextResponse) {
    return member;
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return json({ error: "INVALID_TASK" }, 400);
  }

  const tasks = await readTasks();
  const nextTasks = await writeTasks(tasks.filter((task) => task.id !== id));

  return json({ tasks: nextTasks });
}
