import { db } from "@/db";
import { task as TaskTable } from "@/db/schema";
import { Task } from "@/entities/Task";
import type { ITaskRepository } from "../ITaskRepository";

export class TaskRepositoryDrizzle implements ITaskRepository {

  async create(data: Task): Promise<void> {
    const task = new Task(data)
    await db.insert(TaskTable).values(task)
  }

  async getAll(): Promise<Task[]> {
    return await db.select().from(TaskTable)
  }
}