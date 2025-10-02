import type { Task } from "@/entities/Task";
import { useCategories } from "@/hooks/useCategories";
import { taskService } from "@/services/taskService";
import type { CreateTaskParams } from "@/services/taskService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowDownCircle, ArrowRightCircle, ArrowUpCircle, CheckCheckIcon, CheckCircle, Clock, PlusIcon, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";




// finishedAt: timestamp("finished_at"),

// assignedUserId: uuid("assigned_user_id").references(() => user.id),
// creatorUserId: uuid("creator_user_id").references(() => user.id),
// categoryId: uuid("category_id").references(() => category.id),

// completionDate: timestamp("completion_date").notNull(),

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.uuid(),
  status: z.enum(["completed", "pending", "deleted"]).default('pending'),
  priorityLevel: z.enum(["high", "medium", "low"]),
  assignedUserId: z.uuid(),
  completionDate: z.date()
});



type FormData = z.infer<typeof createTaskSchema>;

export const CreateTaskModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const { categories } = useCategories();
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

      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
        ...old,
        { ...newTask, id: "temp-id" },
      ]);

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
      priorityLevel: 'medium',
      completionDate: new Date()
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar tarefa</DialogTitle>
          <DialogDescription>Crie sua tarefa simples</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateTask)}>
          <div className="space-y-4">
            <Input
              placeholder="Nome da tarefa"
              maxLength={255}
              {...register("title")}
            />

            <Textarea
              placeholder="Descrição (opcional)"
              maxLength={255}
              rows={3}
              {...register("description")}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="priorityLevel"
                control={control}
                defaultValue="medium"
                render={({ field }) => (
                  <div className="flex flex-col space-y-2">
                    <Label>Prioridade</Label>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
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
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
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
            </div>


            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="assignedUserId"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col space-y-2">
                    <Label>Atribuir</Label>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category.id}>
                            {category.name}
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
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>


            <div className="flex items-center gap-4 justify-between">
              <Button
                type="button"
                className="flex-1"
                variant="outline"
                onClick={() => setOpenModal(false)}
                  disabled={formState.isSubmitting || formState.isDirty}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={formState.isSubmitting || formState.isDirty}
              >
                {formState.isSubmitting ? "Criando tarefa..." : "Criar tarefa"}
                <CheckCheckIcon />
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
