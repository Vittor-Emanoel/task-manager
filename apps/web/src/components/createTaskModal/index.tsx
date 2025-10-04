import { useCategories } from "@/hooks/useCategories";
import { useUsers } from "@/hooks/useUsers";
import { taskService } from "@/services/taskService";
import type { CreateTaskParams } from "@/services/taskService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowDownCircle,
  ArrowRightCircle,
  ArrowUpCircle,
  CheckCheckIcon,
  CheckCircle,
  Clock,
  PlusIcon,
  Trash2,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MinimalTiptap } from "../ui/minimal-tiptap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// finishedAt: timestamp("finished_at"),

// assignedUserId: uuid("assigned_user_id").references(() => user.id),
// creatorUserId: uuid("creator_user_id").references(() => user.id),
// categoryId: uuid("category_id").references(() => category.id),

// completionDate: timestamp("completion_date").notNull(),

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.uuid(),
  status: z.enum(["completed", "pending", "deleted"]).default("pending"),
  priorityLevel: z.enum(["high", "medium", "low"]),
  assignedUserId: z.uuid(),
  completionDate: z.coerce.date(),
});

type FormData = z.infer<typeof createTaskSchema>;

export const CreateTaskModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const { categories } = useCategories();
  const { users } = useUsers();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: CreateTaskParams) => {
      return taskService.create(data);
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<CreateTaskParams[]>([
        "tasks",
      ]);

      // queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
      //   ...old,
      //   { ...newTask, id: "temp-id" },
      // ]);

      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
      toast.error("Erro ao criar tarefa!");
    },
    onSuccess: () => {
      toast.success("Tarefa criada com sucesso!");
      setOpenModal(false);
    },
  });

  const { handleSubmit, register, control, formState, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priorityLevel: "medium",
      completionDate: new Date().toISOString(),
    },
    resolver: zodResolver(createTaskSchema),
  });

  const handleCreateTask = useCallback(async (formData: FormData) => {
    try {
      await mutateAsync(formData);
      toast.success("Tarefa criada com sucesso!");
      reset();
      setOpenModal(false);
    } catch (error) {
      toast.error("Erro ao criar tarefa!");
    }
  }, []);

  return (
    <Dialog open={openModal} onOpenChange={(state) => setOpenModal(state)}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpenModal(true)}>
          <PlusIcon />
          Adicionar tarefa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar tarefa</DialogTitle>
          <DialogDescription>
            Adicione os detalhes da sua nova tarefa
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateTask)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4"
        >
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Nome da tarefa"
                maxLength={255}
                {...register("title")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <MinimalTiptap
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Start typing your content here..."
                    className="min-h-[400px]"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Controller
              name="priorityLevel"
              control={control}
              defaultValue="medium"
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <Label>Prioridade</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <ArrowUpCircle className="w-4 h-4 text-red-500" />
                          <span>Alta</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <ArrowRightCircle className="w-4 h-4 text-yellow-500" />
                          <span>Média</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <ArrowDownCircle className="w-4 h-4 text-green-500" />
                          <span>Baixa</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="status"
              control={control}
              defaultValue="pending"
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <Label>Status</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Concluído</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span>Pendente</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="deleted">
                        <div className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span>Excluído</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="assignedUserId"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <Label>Atribuído a</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      {users?.map((user) => (
                        <SelectItem value={user.id} key={user.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="size-6">
                              <AvatarImage src={user.image ?? ""} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <Label>Categoria</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category.id} key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="completionDate"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col space-y-2">
                  <Label>Data de Conclusão</Label>
                  <Input
                    type="date"
                    value={
                      field.value
                        ? new Date(
                            typeof field.value === "string" ||
                            typeof field.value === "number" ||
                            field.value instanceof Date
                              ? field.value
                              : ""
                          )
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : null
                      )
                    }
                  />
                </div>
              )}
            />
          </div>

          <div className="md:col-span-3 flex justify-end gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal(false)}
              disabled={formState.isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Criando..." : "Criar tarefa"}
              <CheckCheckIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
