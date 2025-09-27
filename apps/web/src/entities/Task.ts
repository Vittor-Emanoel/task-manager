export interface Task {
  id: string;
  title: string;
  categoryId: string;
  description?: string;
  status?: "completed" | "pending" | "deleted";
  priority?: "high" | "medium" | "low";
  finishedAt?: Date;
}
