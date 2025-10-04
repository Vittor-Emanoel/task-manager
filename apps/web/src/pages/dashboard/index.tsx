import { AppSidebar } from "@/components/app-sidebar";
import { CreateTaskModal } from "@/components/createTaskModal";
import { TaskItem } from "@/components/task-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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
import { formatTaskDate } from "@/utils/formatTaskDate";
import { groupObject } from "@/utils/groupObject";
import { useMutation } from "@tanstack/react-query";
import { ChevronDown, LayoutDashboardIcon, ListIcon } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/kanban";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskItemSkeleton() {
  return (
    <Card className="relative flex items-start gap-3 rounded-2xl border p-4">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-3 w-2/3" />

        <div className="mt-2 flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
      </div>

      <Skeleton className="absolute right-3 top-3 h-4 w-4 rounded-full" />
    </Card>
  );
}
export const Dashboard = () => {
  const { tasks, isLoading: isTasksLoading } = useTasks();
  const { mutateAsync } = useMutation({
    mutationFn: async (params: Task) => await taskService.update(params),
  });

  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const tasksByCompletedDate = groupObject(tasks, "completionDate");

  const kanbanTasks = tasks.map((task) => ({
    ...task,
    name: task.title,
    column: task.status || "pending",
  }));

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
            <>
              {Object.entries(tasksByCompletedDate).map(([date, tasks]) => (
                <Collapsible key={date} defaultOpen>
                  <CollapsibleTrigger className="group mb-4 w-full text-left">
                    <div className="flex items-center gap-2 text-sm">
                      <ChevronDown className="transition group-data-[state=open]:rotate-180 size-5" />
                      {formatTaskDate(new Date(date))}
                    </div>
                    <Separator className="mt-2" />
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="flex flex-col gap-4 overflow-y-auto">
                      {isTasksLoading
                        ? [...Array(3)].map((_, i) => (
                            <TaskItemSkeleton key={i} />
                          ))
                        : tasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                          ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </>
          ) : (
            <KanbanProvider
              columns={[
                { id: "pending", name: "Pendentes", color: "#FBBF24" },
                { id: "completed", name: "Completadas", color: "#10B981" },
                { id: "deleted", name: "Deletadas", color: "#EF4444" },
              ]}
              data={kanbanTasks}
              onDataChange={(newData) => {
                const updatedTasks: Task[] = newData.map((item) => {
                  const originalTask = tasks.find((t) => t.id === item.id);
                  if (!originalTask) return item as Task;
                  return {
                    ...originalTask,
                    status: item.column as "pending" | "completed" | "deleted",
                  };
                });
              }}
            >
              {(column) => (
                <KanbanBoard key={column.id} id={column.id}>
                  <KanbanHeader>{column.name}</KanbanHeader>
                  <KanbanCards id={column.id}>
                    {(kanbanItem) => {
                      const fullTask = tasks.find(
                        (t) => t.id === kanbanItem.id
                      );
                      if (!fullTask) return null;

                      return (
                        <KanbanCard key={fullTask.id} {...kanbanItem}>
                          <TaskItem task={fullTask} />
                        </KanbanCard>
                      );
                    }}
                  </KanbanCards>
                </KanbanBoard>
              )}
            </KanbanProvider>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
