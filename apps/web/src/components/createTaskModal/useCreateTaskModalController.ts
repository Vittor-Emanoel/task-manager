import { getAll } from "@/services/task/getAll";
import { useForm } from "@tanstack/react-form";

export const useCreateTaskModalController = () => {
	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			categoryId: "",
		},
		onSubmit: async ({ value }) => {
			
		const a = await getAll()

		console.log(a, 'A')
		// 		await CreateTaskAction(value)
				// alert('OK')
			},
	});

	return { form };
};
