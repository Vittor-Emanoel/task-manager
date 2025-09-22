import { useForm } from "@tanstack/react-form";
import { CheckCheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { RecurringCard } from "./components/RecurringCard";
import { ScheduleCard } from "./components/ScheduleCard";
type TaskType = "single" | "recurring";

interface ICreateTaskModalProps {
  children: React.ReactNode;
}

export const CreateTaskModal = ({ children }: ICreateTaskModalProps) => {
  const [taskType, setTaskType] = useState<TaskType>("single");

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: ({ value }) => {
      console.log(value, "value");
    },
    // validators: {
    //   onChange: createTaskSchema,
    // },
  });

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar tarefa</DialogTitle>
          <DialogDescription>
            Crie sua tarefa para uma data específica ou recorrente
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="space-y-4">
            <form.Field
              name="name"
              children={(field) => {
                return (
                  <Input
                    placeholder="Nome da tarefa"
                    maxLength={255}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                );
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                return (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Descrição (opcional)"
                    maxLength={255}
                    rows={3}
                  />
                );
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Tarefa</Label>
                <Select
                  value={taskType}
                  onValueChange={(value: "single" | "recurring") =>
                    setTaskType(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Tarefa única</SelectItem>
                    <SelectItem value="recurring">Tarefa recorrente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={taskType}
                  onValueChange={(value: "single" | "recurring") =>
                    setTaskType(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Tarefa única</SelectItem>
                    <SelectItem value="recurring">Tarefa recorrente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t border rounded-md">
              {taskType === "single" && <ScheduleCard />}
              {taskType === "recurring" && <RecurringCard />}
            </div>

            <form.Subscribe>
              <Button className="w-full" type="submit">
                Criar Tarefa
                <CheckCheckIcon />
              </Button>
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
