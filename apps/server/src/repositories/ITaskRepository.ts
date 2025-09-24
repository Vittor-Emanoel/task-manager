import type { Task } from "@/entities/Task"

export interface ITaskRepository {
  create(data: Task): Promise<void>
  getAll(): Promise<Task[]>
}