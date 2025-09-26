import type { Task } from "@/entities/Task";
import { httpClient } from "../httpClient";

type TasksResponse = Array<Task>;

export async function getAll() {
  const { data } = await httpClient.get<TasksResponse>("/tasks");

  return data;
}
