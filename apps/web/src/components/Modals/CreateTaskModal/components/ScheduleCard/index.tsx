import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ScheduleCard = () => {
  return (
    <div className="space-y-3 p-3 bg-zinc-100 rounded-lg">
      <Label className="text-sm font-medium">Agendamento</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Data</Label>
          <Input type="date" min={new Date().toISOString().split("T")[0]} />
        </div>
        <div>
          <Label className="text-xs">Horário</Label>
          <Input type="time" />
        </div>
      </div>
    </div>
  );
};
