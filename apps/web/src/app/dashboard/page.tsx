"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { CreateTaskModal } from "@/components/createTaskModal";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plus, Search } from "lucide-react";

export default function Page() {
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
                  <BreadcrumbLink href="#"></BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-white">
                Gerenciador de tarefas
              </h1>
              <p className="text-gray-400 text-sm">
                Crie suas tarefas e deixe a IA organizá-las para você.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CreateTaskModal>
                <div>
                  Nova tarefa
                  <Plus />
                </div>
              </CreateTaskModal>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="*:not-first:mt-2 flex-1">
              <div className="relative ">
                <Input
                  id={"a"}
                  className="peer ps-9"
                  placeholder="Ler pelo menos 30 minutos hoje..."
                  type="email"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <Search size={16} aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={"1"}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Todos</SelectItem>
                  <SelectItem value="2">Pendente</SelectItem>
                  <SelectItem value="3">Em progresso</SelectItem>
                  <SelectItem value="3">Completo</SelectItem>
                </SelectContent>
              </Select>
              <Select value={"1"}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Alta</SelectItem>
                  <SelectItem value="2">Media</SelectItem>
                  <SelectItem value="3">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle>Ligar para mecanico</CardTitle>
                <CardDescription>
                  Preciso ligar para o mecanico, pois preciso buscar o carro as
                  12:00
                </CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ligar para mecanico</CardTitle>
                <CardDescription>
                  Preciso ligar para o mecanico, pois preciso buscar o carro as
                  12:00
                </CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ligar para mecanico</CardTitle>
                <CardDescription>
                  Preciso ligar para o mecanico, pois preciso buscar o carro as
                  12:00
                </CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ligar para mecanico</CardTitle>
                <CardDescription>
                  Preciso ligar para o mecanico, pois preciso buscar o carro as
                  12:00
                </CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
