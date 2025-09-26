import { useCategories } from "@/hooks/useCategories";
import { taskService } from "@/services/taskService";
import type { CreateTaskParams } from "@/services/taskService/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCheckIcon } from "lucide-react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
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

interface ICreateTaskModalProps {
  children: React.ReactNode;
}

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.uuid(),
});

type FormData = z.infer<typeof createTaskSchema>;

export const CreateTaskModal = ({ children }: ICreateTaskModalProps) => {
  const { categories } = useCategories();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: CreateTaskParams) => {
      return taskService.create(data);
    },
  });
  const { handleSubmit, register, control, formState } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(createTaskSchema),
  });

  const handleCreateTask = useCallback(async (formData: FormData) => {
    try {
      await mutateAsync(formData);
      alert("Criada");
    } catch (error) {}
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
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
            <div className="space-y-2">
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <>
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
                  </>
                )}
              />
            </div>

            <div className="flex items-center gap-4 justify-between">
              <Button type="button" className="flex-1" variant="outline">
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={formState.isSubmitting || !formState.isReady}
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
