import { useForm } from "@tanstack/react-form";

export const useCreateTaskModalController = () => {
	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			categoryId: "",
		},
		onSubmit: ({ value }) => {
			console.log(value, "value");
		},
	});

	return { form };
};
