import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface IWeeklyBadgeSelectProps {
  daysOfWeek: {
    value: number;
    label: string;
  }[];
  selectedWeekDays: number[];
  onSelectDay: (dayNumber: number) => void;
}

export const WeeklyBadgeSelect = ({
  daysOfWeek,
  selectedWeekDays,
  onSelectDay,
}: IWeeklyBadgeSelectProps) => {
  return (
    <div>
      <Label className="text-xs">Dias da semana</Label>
      <div className="flex flex-wrap gap-2 mt-1">
        {daysOfWeek.map((day) => (
          <Badge
            key={day.value}
            className={`flex items-center space-x-1 px-2 py-1 rounded cursor-pointer text-xs ${
              selectedWeekDays.includes(day.value)
                ? "bg-zinc-900 text-white"
                : "bg-zinc-200 text-zinc-700 hover:bg-gray-300"
            }`}
            onClick={() => onSelectDay(day.value)}
          >
            <span>{day.label}</span>
          </Badge>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Ex: Para todas as quintas, selecione apenas "Qui"
      </div>
    </div>
  );
};
