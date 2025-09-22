import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Field } from "@tanstack/react-form";
import { CheckCheckIcon, ChevronDownIcon } from "lucide-react";
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
import {
	type RecurringType,
	type TaskType,
	useCreateTaskModalController,
} from "./useCreateTaskModalController";

interface ICreateTaskModalProps {
	children: React.ReactNode;
}

export const CreateTaskModal = ({ children }: ICreateTaskModalProps) => {
	const {
		categoryId,
		date,
		daysOfWeek,
		form,
		getRecurringTypeLabel,
		taskType,
		setTaskType,
		setRecurrentType,
		setOpen,
		setDate,
		setCategoryId,
		recurrentType,
		open,
	} = useCreateTaskModalController();

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
															step={1}
															defaultValue={field.state.value ?? null}
															onChange={({ target }) =>
																field.handleChange(Number(target.value))
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
							{taskType === "recurring" && (
								<div className="space-y-3 rounded-lg light:bg-zinc-50 p-3 shadow">
									<Label className="font-medium text-sm">
										Configuração de Recorrência
									</Label>
									<form.Field name="recurringPattern">
										{(field) => (
											<div className="grid grid-cols-2 gap-4">
												<div>
													<Label className="text-xs" htmlFor={field.name}>
														Repetir
													</Label>
													<Select
														value={field.state.value}
														onValueChange={(value) => {
															field.handleChange(value);
															setRecurrentType(value);
														}}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Escolha o padrão" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="daily">Diariamente</SelectItem>
															<SelectItem value="weekly">
																Semanalmente
															</SelectItem>
															<SelectItem value="monthly">
																Mensalmente
															</SelectItem>
															<SelectItem value="yearly">Anualmente</SelectItem>
														</SelectContent>
													</Select>
												</div>

												<div>
													<form.Field name="recurringInterval">
														{(field) => (
															<>
																<Label className="text-xs" htmlFor={field.name}>
																	A cada quantos{" "}
																	{getRecurringTypeLabel(
																		recurrentType as RecurringType,
																	)}
																</Label>
																<Input
																	id={field.name}
																	type="number"
																	min={1}
																	max={20}
																	defaultValue={field.state.value}
																	placeholder="1"
																	className="w-full"
																	onChange={({ target }) =>
																		field.handleChange(Number(target.value))
																	}
																/>
															</>
														)}
													</form.Field>
												</div>
											</div>
										)}
									</form.Field>

									{recurrentType === "weekly" && (
										<form.Field name="recurringDaysOfWeek">
											{(field) => (
												<>
													<Label className="text-xs" htmlFor={field.name}>
														Dias da semana
													</Label>
													<div className="mt-1 flex flex-wrap gap-2">
														{daysOfWeek.map((day) => {
															const isSelected = field.state.value?.includes(
																day.value,
															);

															return (
																<Badge
																	key={day.value}
																	className={`flex cursor-pointer items-center space-x-1 rounded px-2 py-1 text-xs ${
																		isSelected
																			? "bg-zinc-900 text-white"
																			: "bg-zinc-200 text-zinc-700 hover:bg-gray-300"
																	}`}
																	onClick={() => {
																		const current = field.state.value || [];

																		const updated = isSelected
																			? current.filter((d) => d !== day.value)
																			: [...current, day.value].sort();

																		form.setFieldValue(
																			"recurringDaysOfWeek",
																			updated,
																		);
																	}}
																>
																	<span>{day.label}</span>
																</Badge>
															);
														})}
													</div>
													<div className="mt-1 text-gray-500 text-xs">
														Ex: Para todas as quintas, selecione apenas "Qui"
													</div>
												</>
											)}
										</form.Field>
									)}
									{recurrentType === "monthly" && (
										<form.Field name="recurringDayOfMonth">
											{(field) => (
												<>
													<Label className="text-xs" htmlFor={field.name}>
														Dia do mês
													</Label>
													<Input
														type="number"
														min={1}
														max={31}
														placeholder="Ex: 15 (dia 15 de cada mês)"
														defaultValue={field.state.value}
														onChange={({ target }) =>
															field.handleChange(Number(target.value))
														}
													/>
												</>
											)}
										</form.Field>
									)}

									<div className="grid grid-cols-2 gap-4">
										<form.Field name="recurringEndDate">
											{(field) => (
												<div className="flex flex-col gap-2">
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
												</div>
											)}
										</form.Field>

										<form.Field name="recurringEndTime">
											{(field) => (
												<div className="flex flex-col gap-2">
													<Label htmlFor={field.name} className="px-1">
														Horario
													</Label>
													<Input
														id={field.name}
														type="time"
														step={1}
														defaultValue={field.state.value ?? "00:00:00"}
														onChange={({ target }) =>
															field.handleChange(target.value)
														}
														className="w-full appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
													/>
												</div>
											)}
										</form.Field>
									</div>
								</div>
							)}
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
