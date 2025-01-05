import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'

export default function Login() {
  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <div className="flex flex-col gap-6 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sessão</CardTitle>
            <CardDescription>
              Introduz o teu e-mail e palavra-passe para iniciar sessão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="alice@eneiconf.pt" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Palavra-passe</Label>
                    <a
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Esqueci-me da palavra-passe
                    </a>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••••••" required />
                </div>
                <div className="flex flex-col gap-4   ">
                  <Button type="submit" className="w-full">
                    Iniciar Sessão
                  </Button>
                  <div className="flex gap-2 items-center">
                    <Separator className="shrink" />
                    <p className="text-sm text-muted-foreground min-w-max">Ou</p>
                    <Separator className="shrink" />
                  </div>
                  <Button variant="outline" className="w-full">
                    Iniciar Sessão com o Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Ainda não tens conta?{' '}
                <a href="/signup" className="underline underline-offset-4">
                  Regista-te
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
