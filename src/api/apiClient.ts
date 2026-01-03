const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
