import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useError } from "~/hooks/use_error";
import { cn } from "~/lib/utils";
import { useForm } from "@inertiajs/react";
import Page from "~/components/common/page";
import CardContainer from "~/components/common/containers/card";
import { Link } from "@tuyau/inertia/react";

export default function Login() {
  const oauthError = useError("oauth");

  const { data, setData, post, errors } = useForm({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/auth/register");
  };

  return (
    <Page title="Criar conta" className="bg-enei-blue">
      <CardContainer>
        <Card className={cn(oauthError && "border-2 border-red-600")}>
          <CardHeader>
            <CardTitle className="text-2xl">Criar conta</CardTitle>
            <CardDescription>
              Esta será a conta que vais utilizar para te inscreveres nas atividades do ENEI e umas
              outras coisinhas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="alice@eneiconf.pt"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Palavra-passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    required
                  />
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Confirmar palavra-passe</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••••••"
                    value={data.password_confirmation}
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                    required
                  />
                  {errors.password_confirmation && (
                    <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <Button type="submit" className="w-full">
                    Criar conta
                  </Button>
                  {/* <div className="flex gap-2 items-center"> */}
                  {/*   <Separator className="shrink" /> */}
                  {/*   <p className="text-sm text-muted-foreground min-w-max">Ou</p> */}
                  {/*   <Separator className="shrink" /> */}
                  {/* </div> */}
                  {/* <div className="grid grid-cols-3 gap-2"> */}
                  {/*   <Link */}
                  {/*     route="auth.google.initiate" */}
                  {/*     className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} */}
                  {/*   > */}
                  {/*     <span className="sr-only">Iniciar Sessão com o</span> Google */}
                  {/*     {/* <Google className="h-5 w-5" /> */}
                  {/*   </Link> */}
                  {/*   <Link */}
                  {/*     route="auth.github.initiate" */}
                  {/*     className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} */}
                  {/*   > */}
                  {/*     <span className="sr-only">Iniciar Sessão com o</span> Github */}
                  {/*     {/* <Github className="h-5 w-5" /> */}
                  {/*   </Link> */}
                  {/*   <Link */}
                  {/*     route="auth.linkedin.initiate" */}
                  {/*     className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} */}
                  {/*   > */}
                  {/*     <span className="sr-only">Iniciar Sessão com o</span> LinkedIn */}
                  {/*     {/* <LinkedIn className="h-5 w-5" /> */}
                  {/*   </Link> */}
                  {/* </div> */}
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Já tens conta?{" "}
                <Link route="pages:auth.login">
                  <span className="underline">Iniciar sessão</span>
                </Link>
              </div>
            </form>
            {oauthError && <p className="mt-4 text-center text-sm text-red-600">{oauthError}</p>}
          </CardContent>
        </Card>
      </CardContainer>
    </Page>
  );
}
