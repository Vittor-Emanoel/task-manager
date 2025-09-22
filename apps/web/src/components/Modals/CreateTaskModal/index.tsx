import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Field, useForm } from "@tanstack/react-form";
import { CheckCheckIcon, ChevronDownIcon } from "lucide-react";
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

type TaskType = "single" | "recurring";

interface ICreateTaskModalProps {
	children: React.ReactNode;
}

export const CreateTaskModal = ({ children }: ICreateTaskModalProps) => {
	const [taskType, setTaskType] = useState<TaskType>("single");
	const [categoryId, setCategoryId] = useState("1");
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(new Date());

	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			task_type: "single",
			categoryId: "single",
			scheduledDate: new Date(),
			scheduledTime: "10:30:00",
		},
		onSubmit: ({ value }) => {
			console.log(value, "value");
		},
		// validators: {
		//   onChange: createTaskSchema,
		// },
	});

	// const taskType = form.store.subscribe();

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
							children={(field) => (
								<Input
									placeholder="Nome da tarefa"
									maxLength={255}
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							)}
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
								<Field name="task_type" form={form}>
									{(field) => (
										<>
											<Label htmlFor={field.name}>Tipo de Tarefa</Label>
											<Select
												name={field.name}
												value={field.state.value}
												onValueChange={(value: TaskType) => {
													field.handleChange(value);
													setTaskType(value);
												}}
											>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="single">Tarefa única</SelectItem>
													<SelectItem value="recurring">
														Tarefa recorrente
													</SelectItem>
												</SelectContent>
											</Select>
										</>
									)}
								</Field>
							</div>
							<div className="space-y-2">
								<Field name="categoryId" form={form}>
									{(field) => (
										<>
											<Label htmlFor={field.name}>Categoria</Label>
											<Select
												value={categoryId}
												onValueChange={(value) => {
													field.handleChange(value);
													setCategoryId(value);
												}}
											>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="1">Trabalho</SelectItem>
													<SelectItem value="2">Pessoal</SelectItem>
													<SelectItem value="3">home</SelectItem>
												</SelectContent>
											</Select>
										</>
									)}
								</Field>
							</div>
						</div>

						<div className="rounded-md border border-t">
							{taskType === "single" && (
								<div className="space-y-3 rounded-lg light:bg-zinc-100 p-3">
									<Label className="font-medium text-sm">Agendamento</Label>
									<div className="flex gap-4">
										<div className="flex w-full flex-col gap-3">
											<form.Field name="scheduledDate">
												{(field) => (
													<>
														<Label htmlFor={field.name} className="px-1">
															Data
														</Label>
														<Popover open={open} onOpenChange={setOpen}>
															<PopoverTrigger asChild>
																<Button
																	id={field.name}
																	variant="outline"
																	className="w-full justify-between font-normal"
																>
																	{date
																		? date?.toLocaleDateString()
																		: "Select date"}
																	<ChevronDownIcon />
																</Button>
															</PopoverTrigger>
															<PopoverContent
																className="w-full overflow-hidden p-0"
																align="start"
															>
																<Calendar
																	mode="single"
																	selected={field.state.value}
																	captionLayout="dropdown"
																	onSelect={(date) => {
																		field.handleChange(date as Date);
																		setDate(date);
																		setOpen(false);
																	}}
																/>
															</PopoverContent>
														</Popover>
													</>
												)}
											</form.Field>
										</div>
										<div className="flex w-full flex-col gap-3">
											<form.Field name="scheduledTime">
												{(field) => (
													<>
														<Label htmlFor={field.name} className="px-1">
															Horario
														</Label>
														<Input
															id={field.name}
															type="time"
															step="1"
															defaultValue={field.state.value ?? "10:30:00"}
															onChange={({ target }) =>
																field.handleChange(target.value)
															}
															className="w-full appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
														/>
													</>
												)}
											</form.Field>
										</div>
									</div>
								</div>
							)}
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
