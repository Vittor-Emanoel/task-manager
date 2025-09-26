export interface Task {
  id: string;
  title: string;
  categoryId: string;
  description?: string;
  status?: "pending" | "in_progress" | "done";
  priority?: "high" | "medium" | "low";
}
