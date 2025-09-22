"use client";

import {
  Bell,
  Calendar,
  Command,
  Inbox,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import * as React from "react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CreateTaskModal } from "./Modals/CreateTaskModal";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Task.ai</span>
                  <span className="truncate text-xs">
                    Gerencie suas tarefas
                  </span>
                </div>
                <Bell className="size-8" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <CreateTaskModal>
                  <SidebarMenuButton asChild size="sm">
                    <a>
                      <Plus />
                      <span>Criar tarefa</span>
                    </a>
                  </SidebarMenuButton>
                </CreateTaskModal>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <CreateTaskModal>
                  <SidebarMenuButton asChild size="sm">
                    <a>
                      <Search />
                      <span>Buscar</span>
                    </a>
                  </SidebarMenuButton>
                </CreateTaskModal>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <CreateTaskModal>
                  <SidebarMenuButton asChild size="sm">
                    <a>
                      <Inbox />
                      <span>Entrada</span>
                    </a>
                  </SidebarMenuButton>
                </CreateTaskModal>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <CreateTaskModal>
                  <SidebarMenuButton asChild size="sm">
                    <a>
                      <Calendar />
                      <span>Hoje</span>
                    </a>
                  </SidebarMenuButton>
                </CreateTaskModal>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <CreateTaskModal>
                  <SidebarMenuButton asChild size="sm">
                    <a>
                      <Sparkles />
                      <span>Futuras</span>
                    </a>
                  </SidebarMenuButton>
                </CreateTaskModal>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
