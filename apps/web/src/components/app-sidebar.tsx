"use client";

import {
	Bell,
	Plus
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
import { Logo } from "./logo";

const data = {
	user: {
		name: "vittor",
		email: "vittor@example.com",
		avatar: "http://github.com/Vittor-Emanoel.png",
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
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
									<Logo className="size-6" />
								</div>

								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Task.ai</span>
									<span className="truncate text-xs text-zinc-400">
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
									<SidebarMenuButton asChild size="sm" className="bg-zinc-800 p-4 cursor-pointer">
										<div>
											<Plus />
											<span>Criar tarefa simples</span>
										</div>
									</SidebarMenuButton>
								</CreateTaskModal>
							</SidebarMenuItem>

							{/* <SidebarMenuItem>
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
							</SidebarMenuItem> */}
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
