import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useError } from "~/hooks/use_error";
import { useForm } from "@inertiajs/react";
import { cn } from "~/lib/utils";
import BaseLayout from "~/layouts/base";
import CardLayout from "~/layouts/card";

export default function ForgotPassword() {
  const oauthError = useError("oauth");

  const { data, setData, errors, post } = useForm({
    email: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post("/auth/password/forgot/new");
  };

  return (
    <BaseLayout title="Repor palavra-passe">
      <CardLayout>
        <Card className={cn(oauthError && "border-2 border-red-600")}>
          <CardHeader>
            <CardTitle className="text-2xl">Repor palavra-passe</CardTitle>
            <CardDescription>
              Introduz o teu e-mail para recuperares a tua palavra-passe
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
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="bg-enei-blue w-full">
                    Recuperar palavra-passe
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </CardLayout>
    </BaseLayout>
  );
}
