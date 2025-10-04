export interface Task {
  id: string;
  title: string;
  categoryId: string;
  description?: string;
  status: "completed" | "pending" | "deleted";
  priorityLevel: "high" | "medium" | "low";
  assignedUserId: string;
  assignedUserName: string;
  assignedUserEmail: string;
  assignedUserAvatarUrl: string;
  categoryColor: string;
  categoryName: string;
  completionDate: string;
  creatorUserId: string;
  finishedAt?: Date;
}
