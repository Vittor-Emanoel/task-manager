"use client";

import {
	AlertTriangle,
	Bell,
	Briefcase,
	Calendar,
	CheckSquare,
	FolderPlus,
	HelpCircle,
	LayoutDashboard,
	LifeBuoy,
	Lightbulb,
	MessageSquare,
	Plus,
	Settings2,
	User
} from "lucide-react";
import type * as React from "react";

import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import { NavMain } from "./nav-main";
import { NavCategories } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";

const data = {
	user: {
		name: "Vittor",
		email: "vittor@example.com",
		avatar: "https://avatars.githubusercontent.com/u/55211291?v=4",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "#",
			icon: LayoutDashboard,
			isActive: true,
			items: [
				{
					title: "Visão Geral",
					url: "#",
				},
				{
					title: "Atividade Recente",
					url: "#",
				},
			
			],
		},
		{
			title: "Tarefas",
			url: "#",
			icon: CheckSquare,
			items: [
				{
					title: "Todas as Tarefas",
					url: "#",
				},
				{
					title: "Pendentes",
					url: "#",
				},
				{
					title: "Em Andamento",
					url: "#",
				},
				{
					title: "Concluídas",
					url: "#",
				},
				{
					title: "Atrasadas",
					url: "#",
				},
			],
		},
	
		{
			title: "Calendário",
			url: "#",
			icon: Calendar,
			items: [
				{
					title: "Hoje",
					url: "#",
				},
				{
					title: "Esta Semana",
					url: "#",
				},
				{
					title: "Este Mês",
					url: "#",
				},
				{
					title: "Próximos Prazos",
					url: "#",
				},
			],
		},
		
	],
	navSecondary: [
		{
			title: "Ajuda",
			url: "#",
			icon: HelpCircle,
		},
		{
			title: "Feedback",
			url: "#",
			icon: MessageSquare,
		},
		{
			title: "Suporte",
			url: "#",
			icon: LifeBuoy,
		},
			{
			title: "Integrações",
			url: "#",
			icon: Settings2,
		},
	],
	categories: [
		{
			name: "Trabalho",
			url: "#",
			icon: Briefcase,
			color: "#3b82f6",
		},
		{
			name: "Personal",
			url: "#",
			icon: User,
			color: "#10b981",
		},
		{
			name: "Urgente",
			url: "#",
			icon: AlertTriangle,
			color: "#ef4444",
		},
		{
			name: "Ideias",
			url: "#",
			icon: Lightbulb,
			color: "#f59e0b",
		},
	],
	quickActions: [
		{
			title: "Nova Tarefa",
			action: "create-task",
			icon: Plus,
			shortcut: "Ctrl+N",
		},
		{
			title: "Novo Projeto",
			action: "create-project",
			icon: FolderPlus,
			shortcut: "Ctrl+Shift+N",
		},
	],
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
				<NavMain items={data.navMain} />
        <NavCategories categories={data.categories} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
