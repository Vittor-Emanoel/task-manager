import { taskService } from "@/services/taskService";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getAll,
  });

  return { tasks: data ?? [], isLoading };
}
