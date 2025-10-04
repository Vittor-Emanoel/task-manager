import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { Task } from "@/entities/Task";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

export function TaskItem({ task }: { task: Task }) {
  return (
    <Card
      className={cn(
        "group relative flex items-start gap-3 rounded-2xl border p-4 transition-colors"
      )}
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <CardTitle
            className={cn(
              "text-base font-medium transition-colors",
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
              "text-sm transition-colors",
              task.status === "completed" && "text-gray-300"
            )}
          >
            {task.description}
          </CardDescription>
        )}

        <div className="mt-2 flex items-center gap-3 text-sm">
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
              task.priority === "high" && "bg-red-100 text-red-700",
              task.priority === "medium" && "bg-yellow-100 text-yellow-700",
              task.priority === "low" && "bg-green-100 text-green-700"
            )}
          >
            {task.priority}
          </Badge>

          {task.categoryName && (
            <Badge
              className="text-xs"
              style={{
                backgroundColor: task.categoryColor || "#e5e7eb",
                color: "#fff",
              }}
            >
              {task.categoryName}
            </Badge>
          )}
        </div>
      </div>

      <button className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
        <Trash className="h-4 w-4 text-gray-400 hover:text-red-500" />
      </button>
    </Card>
  );
}
