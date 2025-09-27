import type { Task } from "@/entities/Task";
import { httpClient } from "../httpClient";

export async function update(task: Task) {
  const { id, ...rest } = task;
  const { data } = await httpClient.put(`/tasks/${task.id}`, rest);
  return data;
}
