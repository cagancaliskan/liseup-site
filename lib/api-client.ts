import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("liseup_at")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${BACKEND}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API error ${res.status} on ${path}`);
  }

  return res.json() as Promise<T>;
}
