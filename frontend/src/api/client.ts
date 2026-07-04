const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8000"

export interface ComplimentsResponse {
  compliments: string[]
  hearts: string[]
}

export interface ReflectionsResponse {
  reflections: string[]
}

export interface MessageResponse {
  formatted: string
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return (await res.json()) as T
}

export const api = {
  getCompliments: (count = 3) => request<ComplimentsResponse>(`/api/compliments?count=${count}`),
  getReflections: () => request<ReflectionsResponse>("/api/reflections"),
  sendMessage: (text: string) =>
    request<MessageResponse>("/api/message", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),
}
