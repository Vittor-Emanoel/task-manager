import { CheckCheckIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export const CreateTaskModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [taskType, setTaskType] = useState<"single" | "recurring">("single");
  const [recurringPattern, setRecurringPattern] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const daysOfWeek = [
    { value: 0, label: "Dom" },
    { value: 1, label: "Seg" },
    { value: 2, label: "Ter" },
    { value: 3, label: "Qua" },
    { value: 4, label: "Qui" },
    { value: 5, label: "Sex" },
    { value: 6, label: "Sab" },
  ];

  const handleDayToggle = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar tarefa</DialogTitle>
          <DialogDescription>
            Crie sua tarefa para uma data específica ou recorrente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="Nome da tarefa" maxLength={255} />
          <Textarea
            placeholder="Descrição (opcional)"
            maxLength={255}
            rows={3}
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
            {taskType === "single" && (
              <div className="space-y-3 p-3 bg-zinc-100 rounded-lg">
                <Label className="text-sm font-medium">Agendamento</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Data</Label>
                    <Input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Horário</Label>
                    <Input type="time" />
                  </div>
                </div>
              </div>
            )}

            {taskType === "recurring" && (
              <div className="space-y-3 p-3 bg-zinc-50 shadow rounded-lg">
                <Label className="text-sm font-medium">
                  Configuração de Recorrência
                </Label>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Repetir</Label>
                    <Select
                      value={recurringPattern}
                      onValueChange={setRecurringPattern}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha o padrão" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diariamente</SelectItem>
                        <SelectItem value="weekly">Semanalmente</SelectItem>
                        <SelectItem value="monthly">Mensalmente</SelectItem>
                        <SelectItem value="yearly">Anualmente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs">
                      A cada quantos{" "}
                      {recurringPattern === "daily"
                        ? "dias"
                        : recurringPattern === "weekly"
                          ? "semanas"
                          : recurringPattern === "monthly"
                            ? "meses"
                            : recurringPattern === "yearly"
                              ? "anos"
                              : "períodos"}
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      defaultValue="1"
                      placeholder="1"
                      className="w-full"
                    />
                  </div>
                </div>

                {recurringPattern === "weekly" && (
                  <div>
                    <Label className="text-xs">Dias da semana</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {daysOfWeek.map((day) => (
                        <Badge
                          key={day.value}
                          className={`flex items-center space-x-1 px-2 py-1 rounded cursor-pointer text-xs ${
                            selectedDays.includes(day.value)
                              ? "bg-zinc-500 text-white"
                              : "bg-zinc-200 text-zinc-700 hover:bg-gray-300"
                          }`}
                          onClick={() => handleDayToggle(day.value)}
                        >
                          <span>{day.label}</span>
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Ex: Para todas as quintas, selecione apenas "Qui"
                    </div>
                  </div>
                )}

                {recurringPattern === "monthly" && (
                  <div>
                    <Label className="text-xs">Dia do mês</Label>
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="Ex: 15 (dia 15 de cada mês)"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Horário</Label>
                    <Input type="time" placeholder="Ex: 23:00" />
                  </div>

                  <div>
                    <Label className="text-xs">Parar em (opcional)</Label>
                    <Input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button className="w-full">
            Criar Tarefa
            <CheckCheckIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
