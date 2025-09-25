import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";

export const SignupForm = () => {
  // const router = useRouter();
  // const { isPending } = authClient.useSession();

  // const form = useForm({
  // 	defaultValues: {
  // 		email: "",
  // 		password: "",
  // 		name: "",
  // 	},
  // 	onSubmit: async ({ value }) => {
  // 		await authClient.signUp.email(
  // 			{
  // 				email: value.email,
  // 				password: value.password,
  // 				name: value.name,
  // 			},
  // 			{
  // 				onSuccess: () => {
  // 					router.push("/dashboard");
  // 					toast.success("Conta criada com sucesso!");
  // 				},
  // 				onError: (error) => {
  // 					toast.error(error.error.message || error.error.statusText);
  // 				},
  // 			},
  // 		);
  // 	},
  // 	validators: {
  // 		onSubmit: z.object({
  // 			name: z.string().min(2, "Nome deve conter pelo menos 2 caracteres"),
  // 			email: z.email("Endereço de e-mail inválido"),
  // 			password: z.string().min(8, "Senha deve conter pelo menos 8 caracteres"),
  // 		}),
  // 	},
  // });

  // if (isPending) {
  //   return <Loader />;
  // }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   form.handleSubmit();
      // }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">
              Bem vindo ao <span className="text-sky-500">Task.IA</span>
            </h1>
            <div className="text-center text-sm">
              Já tem acesso?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Entre com a sua conta
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  type="text"
                  placeholder="Digite seu nome"
                  // id={field.name}
                  // name={field.name}
                  // value={field.state.value}
                  // onBlur={field.handleBlur}
                  // onChange={(e) => field.handleChange(e.target.value)}
                />
                {/* {field.state.meta.errors.map((error) => (
                      <small key={error?.message} className="text-red-500">
                        {error?.message}
                      </small>
                    ))} */}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Digite seu email"
                // id={field.name}
                // name={field.name}
                // value={field.state.value}
                // onBlur={field.handleBlur}
                // onChange={(e) => field.handleChange(e.target.value)}
              />
              {/* {field.state.meta.errors.map((error) => (
                    <span key={error?.message} className="text-red-500">
                      {error?.message}
                    </span>
                  ))} */}
            </div>

            <div className="space-y-2">
              <Label>Senha</Label>
              <Input
              // id={field.name}
              // placeholder="Digite sua senha"
              // name={field.name}
              // value={field.state.value}
              // onBlur={field.handleBlur}
              // onChange={(e) => field.handleChange(e.target.value)}
              />

              {/* {field.state.meta.errors.map((error) => (
                    <span key={error?.message} className="text-red-500">
                      {error?.message}
                    </span>
                  ))} */}
            </div>

            <Button
              type="submit"
              className="w-full"
              // disabled={!state.canSubmit || state.isSubmitting}
            >
              {/* {state.isSubmitting ? "Submitting..." : "Sign Up"} */}
              Criar
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Para clicar me continue, você concorda com nossos{" "}
        <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
};
