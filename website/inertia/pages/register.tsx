import { Link } from '@tuyau/inertia/react'
import { Button, buttonVariants } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { useError } from '~/hooks/use_error'
import { useForm } from '@inertiajs/react'
import { cn } from '~/lib/utils'

export default function Login() {
  const oauthError = useError('oauth')

  const { data, setData, post } = useForm({
    email: '',
    password: '',
    confirm_password: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    post('/auth/register')
  }

  return (
    // <AppLayout title="Criar conta">
    <div className="flex items-center justify-center w-full h-dvh">
      <div className="flex flex-col gap-6 max-w-sm">
        <Card className={cn(oauthError && 'border-red-600')}>
          <CardHeader>
            <CardTitle className="text-2xl text-enei-blue">Criar conta</CardTitle>
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
                    onChange={(e) => setData('email', e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Palavra-passe</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Confirmar palavra-passe</Label>
                  </div>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••••••"
                    value={data.confirm_password}
                    onChange={(e) => setData('confirm_password', e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-4   ">
                  <Button type="submit" className="w-full bg-enei-blue">
                    Criar conta
                  </Button>
                  <div className="flex gap-2 items-center">
                    <Separator className="shrink" />
                    <p className="text-sm text-muted-foreground min-w-max">Ou</p>
                    <Separator className="shrink" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      route="auth.google.initiate"
                      className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                    >
                      <span className="sr-only">Iniciar Sessão com o</span> Google
                      {/* <Google className="h-5 w-5" /> */}
                    </Link>
                    <Link
                      route="auth.github.initiate"
                      className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                    >
                      <span className="sr-only">Iniciar Sessão com o</span> Github
                      {/* <Github className="h-5 w-5" /> */}
                    </Link>
                    <Link
                      route="auth.linkedin.initiate"
                      className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                    >
                      <span className="sr-only">Iniciar Sessão com o</span> LinkedIn
                      {/* <LinkedIn className="h-5 w-5" /> */}
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        {oauthError && <p className="text-sm text-red-600 text-center">{oauthError}</p>}
      </div>
    </div>
    // </AppLayout>
  )
}
