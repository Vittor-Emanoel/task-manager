import { AppSidebar } from "@/components/app-sidebar";
import { CreateTaskModal } from "@/components/createTaskModal";
import { TaskItem } from "@/components/task-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { Task } from "@/entities/Task";
import { useTasks } from "@/hooks/useTasks";
import { taskService } from "@/services/taskService";
import { useMutation } from "@tanstack/react-query";
import { ChevronDown, LayoutDashboardIcon, ListIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

function formatDate(date: Date = new Date()) {
  const hoje = new Date();
  const isHoje =
    date.getDate() === hoje.getDate() &&
    date.getMonth() === hoje.getMonth() &&
    date.getFullYear() === hoje.getFullYear();

  const mesDia = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    day: "numeric",
  })
    .format(date)
    .replace(".", "");

  const diaSemana = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
  }).format(date);

  return `${mesDia} ‧ ${isHoje ? "Hoje ‧ " : ""}${diaSemana}`;
}

export const Dashboard = () => {
  const { tasks, isLoading: isTasksLoading } = useTasks();
  const { mutateAsync } = useMutation({
    mutationFn: async (params: Task) => await taskService.update(params),
  });

  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  /// TODO> da para melhorar isso!
  const tasksByStatus = useMemo(() => {
    const groups: Record<string, Task[]> = {};
    tasks.forEach((t) => {
      if (!groups[t?.status]) groups[t?.status] = [];
      groups[t?.status].push(t);
    });
    return groups;
  }, [tasks]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Tarefas</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="w-full flex gap-2 justify-end">
              <CreateTaskModal />
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="size-4" />
              </Button>
              <Button
                variant={viewMode === "kanban" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("kanban")}
              >
                <LayoutDashboardIcon className="size-4" />
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="group mb-4 w-full text-left">
                <div className="flex items-center gap-2 text-sm">
                  <ChevronDown className="transition group-data-[state=open]:rotate-180 size-5" />
                  {formatDate()}
                </div>
                <Separator className="mt-2" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="flex flex-col gap-4 overflow-y-auto">
                  {isTasksLoading ? (
                    <p>Carregando...</p>
                  ) : (
                    tasks?.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        handleCheckTask={() => mutateAsync(task)}
                      />
                    ))
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto">
              {["pending", "completed", "deleted"].map((status) => (
                <div
                  key={status}
                  className="flex flex-col gap-3 rounded-lg border p-3 bg-muted/30"
                >
                  <h3 className="font-medium capitalize mb-2">{status}</h3>
                  {tasksByStatus[status]?.length ? (
                    tasksByStatus[status].map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        handleCheckTask={() => mutateAsync(task)}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Nenhuma tarefa
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
