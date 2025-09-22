import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export type TaskType = "single" | "recurring";

export type RecurringType = "daily" | "weekly" | "monthly" | "yearly";

const recurringLabels: Record<RecurringType, string> = {
	daily: "dias",
	weekly: "semanas",
	monthly: "meses",
	yearly: "anos",
};

const getRecurringTypeLabel = (type: RecurringType) =>
	recurringLabels[type] ?? "períodos";

const daysOfWeek = [
	{ value: 0, label: "Dom" },
	{ value: 1, label: "Seg" },
	{ value: 2, label: "Ter" },
	{ value: 3, label: "Qua" },
	{ value: 4, label: "Qui" },
	{ value: 5, label: "Sex" },
	{ value: 6, label: "Sab" },
];

export const useCreateTaskModalController = () => {
	const [taskType, setTaskType] = useState<TaskType>("single");
	const [categoryId, setCategoryId] = useState("1");
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(new Date());

	const [recurrentType, setRecurrentType] = useState<RecurringType | string>(
		"",
	);
	const [selectedDays, setSelectedDays] = useState<number[]>([]);

	const handleDayToggle = (day: number) => {
		setSelectedDays((prev) =>
			prev.includes(day)
				? prev.filter((d) => d !== day)
				: [...prev, day].sort(),
		);
	};

	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			task_type: "single",
			categoryId: "",
			scheduledDate: new Date(),
			scheduledTime: 0,
			recurringPattern: "daily",
			recurringInterval: 0,
			recurringDaysOfWeek: [] as number[],
			recurringDayOfMonth: 0,
			recurringEndDate: new Date(),
			recurringEndTime: new Date().toISOString(),
		},
		onSubmit: ({ value }) => {
			console.log(value, "value");
		},
	});

	return {
		form,
		handleDayToggle,
		daysOfWeek,
		selectedDays,
		recurrentType,
		setRecurrentType,
		date,
		setDate,
		taskType,
		setTaskType,
		categoryId,
		setCategoryId,
		open,
		setOpen,
		getRecurringTypeLabel,
	};
};
