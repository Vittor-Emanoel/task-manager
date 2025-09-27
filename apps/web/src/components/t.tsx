import type { Task } from "@/entities/Task";
import { useCategories } from "@/hooks/useCategories";
import { taskService } from "@/services/taskService";
import type { CreateTaskParams } from "@/services/taskService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Flag, MoreHorizontal, PlusCircle } from "lucide-react";

import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Textarea } from "./ui/textarea";

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.uuid(),
});

type FormData = z.infer<typeof createTaskSchema>;

export const CreateTaskCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
      setIsExpanded(false);
      reset();
    },
  });

  const { handleSubmit, register, control, formState, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
    },
    resolver: zodResolver(createTaskSchema),
  });

  const handleCreateTask = useCallback(
    async (formData: FormData) => {
      try {
        await mutateAsync(formData);
      } catch (error) {
        toast.error("Erro ao criar tarefa!");
      }
    },
    [mutateAsync]
  );

  const handleCancel = () => {
    setIsExpanded(false);
    reset();
  };

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(true)}
        className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800/50 p-3 h-auto"
      >
        <PlusCircle className="w-4 h-4 mr-2 text-red-500" />
        Adicionar tarefa
      </Button>
    );
  }

  return (
    <Card className="border-gray-700 bg-gray-900/50 border-l-4 border-l-red-500">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(handleCreateTask)} className="space-y-4">
          {/* Campo de título */}
          <div>
            <Input
              placeholder="Nome da tarefa"
              maxLength={255}
              className="bg-transparent border-none text-white placeholder:text-gray-400 text-sm p-0 focus-visible:ring-0 font-medium"
              {...register("title")}
              autoFocus
            />
          </div>

          {/* Campo de descrição */}
          <div>
            <Textarea
              placeholder="Descrição"
              maxLength={255}
              rows={2}
              className="bg-transparent border-none text-gray-400 placeholder:text-gray-500 text-sm p-0 resize-none focus-visible:ring-0"
              {...register("description")}
            />
          </div>

          {/* Toolbar com controles */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2">
              {/* Data */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <Calendar className="w-3 h-3 mr-1" />
                Data
              </Button>

              {/* Prioridade */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <Flag className="w-3 h-3 mr-1" />
                Prioridade
              </Button>

              {/* Categoria */}
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="h-7 px-2 bg-transparent border-none text-gray-400 hover:text-white hover:bg-gray-700 text-xs">
                      <SelectValue placeholder="# Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${category.color || "bg-blue-500"}`}
                            />
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {/* Mais opções */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </div>

            {/* Botões de ação */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="h-7 px-3 text-gray-400 hover:text-white text-xs"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={formState.isSubmitting || !formState.isValid}
                className="h-7 px-3 bg-red-600 hover:bg-red-700 text-white text-xs"
              >
                {formState.isSubmitting ? "Criando..." : "Adicionar tarefa"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
