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
import type * as React from "react";

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
import { CreateTaskModal } from "./createTaskModal";

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
							<div>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>

								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Task.ai</span>
									<span className="truncate text-xs">
										Gerencie suas tarefas
									</span>
								</div>
								<Bell className="size-8" />
							</div>
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
										<div>
											<Plus />
											<span>Criar tarefa</span>
										</div>
									</SidebarMenuButton>
								</CreateTaskModal>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<CreateTaskModal>
									<SidebarMenuButton asChild size="sm">
										<div>
											<Search />
											<span>Buscar</span>
										</div>
									</SidebarMenuButton>
								</CreateTaskModal>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<CreateTaskModal>
									<SidebarMenuButton asChild size="sm">
										<div>
											<Inbox />
											<span>Entrada</span>
										</div>
									</SidebarMenuButton>
								</CreateTaskModal>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<CreateTaskModal>
									<SidebarMenuButton asChild size="sm">
										<div>
											<Calendar />
											<span>Hoje</span>
										</div>
									</SidebarMenuButton>
								</CreateTaskModal>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<CreateTaskModal>
									<SidebarMenuButton asChild size="sm">
										<div>
											<Sparkles />
											<span>Futuras</span>
										</div>
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
