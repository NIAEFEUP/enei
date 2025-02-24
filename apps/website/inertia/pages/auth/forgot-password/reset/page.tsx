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

  const { data, setData, errors, post } = useForm({ password: "", password_confirmation: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(window.location.href);
  };

  return (
    <BaseLayout title="Repor palavra-passe">
      <CardLayout>
        <Card className={cn(oauthError && "border-2 border-red-600")}>
          <CardHeader>
            <CardTitle className="text-2xl">Repor palavra-passe</CardTitle>
            <CardDescription>Introduz a tua nova palavra-passe</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} method="POST" action="/auth/login">
              <div className="flex flex-col gap-6">
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Confirmar palavra-passe</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    placeholder="••••••••••••"
                    value={data.password_confirmation}
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                    required
                  />
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="bg-enei-blue w-full">
                    Definir palavra-passe
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
