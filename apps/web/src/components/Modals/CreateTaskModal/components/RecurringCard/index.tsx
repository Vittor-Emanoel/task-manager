import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { MonthlyDaysInput } from "./MonthlyDaysInput";
import { WeeklyBadgeSelect } from "./WeeklyBadgeSelect";

type RecurringType = "daily" | "weekly" | "monthly" | "yearly";

const recurringLabels: Record<RecurringType, string> = {
  daily: "dias",
  weekly: "semanas",
  monthly: "meses",
  yearly: "anos",
};

const getRecurringTypeLabel = (type: RecurringType) =>
  recurringLabels[type] ?? "períodos";

export const RecurringCard = () => {
  const [recurrentType, setRecurrentType] = useState<RecurringType | string>(
    ""
  );
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
    <div className="space-y-3 p-3 bg-zinc-50 shadow rounded-lg">
      <Label className="text-sm font-medium">Configuração de Recorrência</Label>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-xs">Repetir</Label>
          <Select value={recurrentType} onValueChange={setRecurrentType}>
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
            {getRecurringTypeLabel(recurrentType as RecurringType)}
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

      {recurrentType === "weekly" && (
        <WeeklyBadgeSelect
          daysOfWeek={daysOfWeek}
          onSelectDay={handleDayToggle}
          selectedWeekDays={selectedDays}
        />
      )}
      {recurrentType === "monthly" && <MonthlyDaysInput />}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-xs">Horário</Label>
          <Input type="time" placeholder="Ex: 23:00" />
        </div>

        <div>
          <Label className="text-xs">Parar em (opcional)</Label>
          <Input type="date" min={new Date().toISOString().split("T")[0]} />
        </div>
      </div>
    </div>
  );
};
