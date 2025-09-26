"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const loginWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: 'http://localhost:5173/',
      errorCallbackURL: "/error",
    });
  };

  // const form = useForm({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: async ({ value }) => {
  //     await authClient.signIn.email(
  //       {
  //         email: value.email,
  //         password: value.password,
  //       },
  //       {
  //         onSuccess: () => {
  //           router.push("/dashboard");
  //         },
  //         onError: (error) => {
  //           toast.error(error.error.message || error.error.statusText);
  //         },
  //       }
  //     );
  //   },
  //   validators: {
  //     onSubmit: z.object({
  //       email: z.email("Endereço de e-mail inválido"),
  //       password: z
  //         .string()
  //         .min(8, "Senha deve conter pelo menos 8 caracteres"),
  //     }),
  //   },
  // });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
              href="#"
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
            <div className="text-center text-sm flex items-center gap-1" >
              Não tem um acesso?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Criar conta
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Label>Email</Label>
            <Input
            // type="text"
            // placeholder="Digite seu e-mail"
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

            <div className="space-y-2">
              <Label>Senha</Label>
              <Input
              // id={field.name}
              // placeholder="Digite sua senha"
              // type="password"
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
            <Button
              type="submit"
              className="w-full"
              // disabled={!state.canSubmit || state.isSubmitting}
            >
              {/* {state.isSubmitting ? "Submitting..." : "Sign Up"} */}
              Criar
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Ou
            </span>
          </div>
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={() => loginWithGoogle()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Entrar com o Google
          </Button>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Para clicar me continue, você concorda com nossos{" "}
        <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}
