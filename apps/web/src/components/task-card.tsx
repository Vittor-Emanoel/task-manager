import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { Task } from "@/entities/Task";
import { cn } from "@/lib/utils";
import { formatTaskDate } from "@/utils/formatTaskDate";

export function TaskItem({ task }: { task: Task }) {
  return (
    <Card
      className={cn(
        "group relative flex flex-col p-4 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-200"
      )}
    >
      <div className="flex items-center justify-between">
        <CardTitle
          className={cn(
            "text-base font-semibold transition-colors",
            task.status === "completed" && "line-through text-gray-400"
          )}
        >
          {task.title}
        </CardTitle>

        <Badge
          variant="outline"
          className={cn(
            "text-xs capitalize",
            task.status === "completed" && "border-green-500 text-green-600",
            task.status === "pending" && "border-yellow-500 text-yellow-600",
            task.status === "deleted" && "border-red-500 text-red-600"
          )}
        >
          {task.status}
        </Badge>
      </div>
      {task.description && (
        <CardDescription
          className={cn(
            "text-sm  text-gray-600 transition-colors",
            task.status === "completed" && "text-gray-400"
          )}
        >
          {task.description}
        </CardDescription>
      )}

      <div className="mt-3 flex items-center gap-2 text-sm">
        <Avatar className="h-6 w-6">
          {task.assignedUserAvatarUrl ? (
            <AvatarImage src={task.assignedUserAvatarUrl} />
          ) : (
            <AvatarFallback>
              {task?.assignedUserName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <Badge
          className={cn(
            "text-xs capitalize",
            task.priorityLevel === "high" && "bg-red-100 text-red-700",
            task.priorityLevel === "medium" && "bg-yellow-100 text-yellow-700",
            task.priorityLevel === "low" && "bg-green-100 text-green-700"
          )}
        >
          {task.priorityLevel}
        </Badge>

        {task.categoryName && (
          <Badge
            className="text-xs"
            style={{
              backgroundColor: task.categoryColor || "#6b7280",
              color: "#fff",
            }}
          >
            {task.categoryName}
          </Badge>
        )}

        <span className="text-zinc-400 ml-auto font-mono">
          {formatTaskDate(task.completionDate, "DD/MM/YYYY")}
        </span>
      </div>
    </Card>
  );
}
