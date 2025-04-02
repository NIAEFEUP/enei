import { useForm } from "@inertiajs/react";
import CardContainer from "~/components/common/containers/card";
import Page from "~/components/common/page";
import { Button } from "@enei/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@enei/shadcn/ui/card";
import { useAuth } from "~/hooks/use_auth";
import { useCooldown } from "~/hooks/use_cooldown";
import { useToast } from "~/hooks/use_toast";
import { useTuyau } from "~/hooks/use_tuyau";

export default function EmailVerification() {
  const auth = useAuth({ only: ["authenticated"] });
  const tuyau = useTuyau();

  const cooldown = useCooldown({
    seconds: 60,
  });

  const { post } = useForm();
  const { toast } = useToast();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(tuyau.$url("actions:auth.verify.send"), {
      onSuccess: () => {
        toast({
          title: "E-mail reenviado!",
          description: "Por favor, verifica a tua caixa de entrada, incluindo o spam!",
          duration: 5000,
        });
      },
    });
  }

  return (
    <Page title="Registo bem-sucedido" className="bg-enei-blue">
      <CardContainer>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Confirmação de e-mail</CardTitle>
            <CardDescription>
              Um e-mail de confirmação foi enviado para{" "}
              <span className="underline">{auth.user.email}</span>. Por favor, verifica a tua caixa
              de entrada, <span className="font-bold">incluindo o spam</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={cooldown.throttle(onSubmit)} method="post">
              <Button type="submit" className="w-full" disabled={cooldown.active}>
                Não recebi nada...
              </Button>
              {cooldown.active && (
                <p className="text-muted-foreground mt-2 text-xs">
                  Por favor espera {cooldown.secondsLeft} segundos antes de tentar novamente.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </CardContainer>
    </Page>
  );
}
