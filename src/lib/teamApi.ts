import { type Task, type TaskInput, type TeamMember } from "@/lib/tasks";

type ApiResult = {
  tasks: Task[];
  shared: boolean;
  pinRequired?: boolean;
};

type ApiOptions = {
  pin: string;
  member?: TeamMember;
};

function headers({ pin, member }: ApiOptions) {
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (pin) {
    requestHeaders["x-team-pin"] = pin;
  }

  if (member) {
    requestHeaders["x-team-member"] = member;
  }

  return requestHeaders;
}

async function parseResponse(response: Response): Promise<ApiResult> {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw Object.assign(new Error(data.message ?? "Gagal sinkron data team."), {
      status: response.status,
      code: data.error,
      pinRequired: data.pinRequired,
    });
  }

  return data as ApiResult;
}

export async function fetchTeamTasks(options: ApiOptions) {
  const response = await fetch("/api/tasks", {
    headers: headers(options),
    cache: "no-store",
  });

  return parseResponse(response);
}

export async function createTeamTask(input: TaskInput, options: ApiOptions) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: headers(options),
    body: JSON.stringify({ input, member: options.member }),
  });

  return parseResponse(response);
}

export async function updateTeamTask(
  id: string,
  input: TaskInput,
  options: ApiOptions,
) {
  const response = await fetch("/api/tasks", {
    method: "PUT",
    headers: headers(options),
    body: JSON.stringify({ id, input, member: options.member }),
  });

  return parseResponse(response);
}

export async function toggleTeamTask(
  id: string,
  completed: boolean,
  options: ApiOptions,
) {
  const response = await fetch("/api/tasks", {
    method: "PATCH",
    headers: headers(options),
    body: JSON.stringify({ id, completed, member: options.member }),
  });

  return parseResponse(response);
}

export async function deleteTeamTask(id: string, options: ApiOptions) {
  const response = await fetch(`/api/tasks?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: headers(options),
  });

  return parseResponse(response);
}
