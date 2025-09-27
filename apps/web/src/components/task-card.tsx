import type { Task } from "@/entities/Task";
import { taskService } from "@/services/taskService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface ITaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: ITaskCardProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (params: Task) => await taskService.update(params),
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          ["tasks"],
          (old) =>
            old?.map((t) => (t.id === updatedTask.id ? updatedTask : t)) ?? []
        );
      }

      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
  });

  const handleCheckTask = async (checked: boolean) => {
    await mutateAsync({
      ...task,
      status: checked ? "completed" : "pending",
      finishedAt: checked ? new Date() : undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={task.status === "completed"}
            onCheckedChange={(checked) => handleCheckTask(!!checked)}
          />
          <div className="flex flex-col">
            <CardTitle
              className={
                task.status === "completed" ? "line-through text-gray-400" : ""
              }
            >
              {task.title}
            </CardTitle>
            {task.description && (
              <CardDescription>{task.description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
