import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description?: string;
  status?: "completed" | "pending" | "deleted";
  priorityLevel?: "high" | "medium" | "low";
  categoryName: string;
  categoryColor: string;
  assignedUserName: string;
  assignedUserEmail: string;
  assignedUserAvatarUrl: string;
};

export function TaskItem({
  task,
  handleCheckTask,
}: {
  task: Task;
  handleCheckTask: (checked: boolean) => void;
}) {
  return (
    <Card
      className={cn(
        "group relative flex items-start gap-3 rounded-2xl border p-4 transition-colors"
        // task.status === "completed"
        //   ? "bg-gray-50 text-gray-400"
        //   : "hover:border-gray-300"
      )}
    >
      {/* <Checkbox
        checked={task.status === "completed"}
        onCheckedChange={(checked) => handleCheckTask(!!checked)}
        className="mt-1 size-5 shrink-0 rounded-md transition-all data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
      /> */}

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
          {/* {task.assignedUser && (
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6">
                {task.assignedUser.avatarUrl ? (
                  <AvatarImage src={task.assignedUser.avatarUrl} />
                ) : (
                  <AvatarFallback>
                    {task.assignedUser.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-gray-500">{task.assignedUser.name}</span>
            </div>
          )} */}

          {/* Prioridade */}
          <Badge
            className={cn(
              "text-xs capitalize",
              task.priorityLevel === "high" && "bg-red-100 text-red-700",
              task.priorityLevel === "medium" &&
                "bg-yellow-100 text-yellow-700",
              task.priorityLevel === "low" && "bg-green-100 text-green-700"
            )}
          >
            {task.priorityLevel}
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

      {/* Botão de ação rápida */}
      <button className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
        <Trash className="h-4 w-4 text-gray-400 hover:text-red-500" />
      </button>
    </Card>
  );
}
