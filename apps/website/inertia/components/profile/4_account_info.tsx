import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useTuyau } from "~/hooks/use_tuyau";
import { useForm } from "@inertiajs/react";
import { useToast } from "~/hooks/use_toast";
import { Label } from "../ui/label";

const AccountInfoForm = () => {
  const tuyau = useTuyau();

  const { toast } = useToast();
  const { data, setData, errors, post } = useForm({
    email: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(tuyau.$url("actions:auth.change-email.send"), {
      onSuccess: () => {
        toast({
          title: "E-mails para alterar e-mail enviados",
          description: "Verifica o teu e-mail atual e o e-mail novo para confirmares a mudança",
          duration: 5000,
        });
      },
      onError: () => {
        toast({
          title: "Não foi possível enviar e-mails",
          description: "Não foi possível enviar os e-mails para alterar o e-mail",
          duration: 5000,
        });
      },
    });
  };

  const changePassword = () => {
    post(tuyau.$url("actions:auth.change-password.send"), {
      onSuccess: () => {
        toast({
          title: "E-mail para repor a palavra-passe enviado",
          description: "Verifica o teu e-mail para repores a tua palavra-passe",
          duration: 5000,
        });
      },
      onError: () => {
        toast({
          title: "Não foi possível enviar e-mail",
          description: "Não foi possível enviar o e-mail para repor a palavra-passe",
          duration: 5000,
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      action={tuyau.$url("actions:auth.change-email.send")}
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <p>
            Para alterares o teu e-mail, preenche a campo abaixo com o novo e-mail, clica no botão
            para alterar, e depois, verifica tanto o atual como o novo e-mail para confirmar a
            alteração.
          </p>
          <Label htmlFor="email">Novo e-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="alice@eneiconf.pt"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
          />
          <Button type="submit" className="bg-enei-blue w-full">
            Alterar e-mail
          </Button>
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="grid gap-2">
          <p>Para alterares a tua palavra-passe, clica no botão abaixo e verifica o teu e-mail.</p>
          <Button type="button" onClick={changePassword} className="bg-enei-blue w-full">
            Repor palavra-passe
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AccountInfoForm;
