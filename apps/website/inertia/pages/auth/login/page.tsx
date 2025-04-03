import { Link } from "@tuyau/inertia/react";
import { Button } from "@enei/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@enei/shadcn/ui/card";
import { Input } from "@enei/shadcn/ui/input";
import { Label } from "@enei/shadcn/ui/label";
import { useError } from "~/hooks/use_error";
import { useForm } from "@inertiajs/react";
import { cn } from "~/lib/utils";
import Page from "~/components/common/page";
import CardContainer from "~/components/common/containers/card";

export default function Login() {
  const oauthError = useError("oauth");

  const { data, setData, errors, post } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post("/auth/login");
  };

  return (
    <Page title="Iniciar Sessão" variant="blue">
      <CardContainer>
        <Card className={cn(oauthError && "border-2 border-red-600")}>
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sessão</CardTitle>
            <CardDescription>
              Introduz o teu e-mail e palavra-passe para iniciar sessão.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} method="POST" action="/auth/login">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="alice@eneiconf.pt"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Palavra-passe</Label>
                    <Link
                      route="pages:auth.forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Esqueci-me da palavra-passe
                    </Link>
                  </div>
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
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="w-full">
                    Iniciar Sessão
                  </Button>
                  {/* <div className="flex gap-2 items-center"> */}
                  {/*   <Separator className="shrink" /> */}
                  {/*   <p className="text-sm text-muted-foreground min-w-max">Ou</p> */}
                  {/*   <Separator className="shrink" /> */}
                  {/* </div> */}
                  {/* <div className="grid grid-cols-3 gap-2"> */}
                  {/* <Link */}
                  {/*   route="auth.google.initiate" */}
                  {/*   className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} */}
                  {/* > */}
                  {/*   <span className="sr-only">Iniciar Sessão com o</span> Google */}
                  {/*   {/* <Google className="h-5 w-5" /> */}
                  {/* </Link> */}
                  {/* <Link */}
                  {/*   route="auth.github.initiate" */}
                  {/*   className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} */}
                  {/* > */}
                  {/*   <span className="sr-only">Iniciar Sessão com o</span> Github */}
                  {/*   {/* <Github className="h-5 w-5" /> */}
                  {/* </Link> */}
                  {/* <Link */}
                  {/*   route="auth.linkedin.initiate" */}
                  {/*   className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} */}
                  {/* > */}
                  {/*   <span className="sr-only">Iniciar Sessão com o</span> LinkedIn */}
                  {/*   {/* <LinkedIn className="h-5 w-5" /> */}
                  {/* </Link> */}
                  {/* </div> */}
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Ainda não tens conta?{" "}
                <Link route="pages:auth.register">
                  <span className="underline">Criar conta</span>
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
