import { Field } from "@tanstack/react-form";
import { CheckCheckIcon } from "lucide-react";

import { useState } from "react";
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
	useCreateTaskModalController
} from "./useCreateTaskModalController";

interface ICreateTaskModalProps {
	children: React.ReactNode;
}

export const CreateTaskModal = ({ children }: ICreateTaskModalProps) => {
	const [categoryId, setCategoryId] = useState("1");
	const {
		form
	} = useCreateTaskModalController();

	return (
		<Dialog>
			<DialogTrigger className="w-full">{children}</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Criar tarefa</DialogTitle>
					<DialogDescription>
						Crie sua tarefa simples
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




						<div className="flex items-center gap-4 justify-between">
							<Button type="button" className="flex-1" variant="outline">
								Cancelar
							</Button>
							<form.Subscribe>
								{(state) => (
									<Button type="submit" className="flex-1"
										disabled={!state.canSubmit || state.isSubmitting}
									>
										{state.isSubmitting ? "Criando tarefa..." : "Criar tarefa"}
										<CheckCheckIcon />
									</Button>
								)}
							</form.Subscribe>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
