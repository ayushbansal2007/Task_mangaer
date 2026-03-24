const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export async function createTask(task: {
  user_id: string;
  title: string;
  days: string[];
  time: string;
}) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json" // Extra safety
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create task");
  }
  return res.json();
}

export async function getTasks(userId: string) {
  const res = await fetch(`${BASE_URL}/tasks/${userId}`);
  if (!res.ok) return []; // Fallback empty array
  return res.json();
}