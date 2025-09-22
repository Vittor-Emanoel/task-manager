import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const MonthlyDaysInput = () => {
  return (
    <div>
      <Label className="text-xs">Dia do mês</Label>
      <Input
        type="number"
        min="1"
        max="31"
        placeholder="Ex: 15 (dia 15 de cada mês)"
      />
    </div>
  );
};
