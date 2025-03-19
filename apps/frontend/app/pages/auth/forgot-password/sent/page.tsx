import { useForm } from '@inertiajs/react'
import { Button } from '@enei/shadcn/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@enei/shadcn/ui/card'
import { useCooldown } from '#hooks/use_cooldown'
import { useToast } from '#hooks/use_toast'
import { useTuyau } from '#hooks/use_tuyau'
import BaseLayout from '#layouts/base'
import CardLayout from '#layouts/card'

export default function EmailVerification() {
  const tuyau = useTuyau()

  const cooldown = useCooldown({
    seconds: 60,
  })
  
  const { post } = useForm()
  const { toast } = useToast()
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(tuyau.$url('actions:auth.forgot-password.send'), {
      onSuccess: () => {
        toast({
          title: 'E-mail reenviado!',
          description: 'Por favor, verifica a tua caixa de entrada, incluindo o spam!',
          duration: 5000,
        })
      },
    })
  }

  return (
    <BaseLayout title="Repor palavra-passe">
      <CardLayout>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">E-mail de recuperação de palavra-passe enviado</CardTitle>
            <CardDescription>
              Um e-mail de confirmação foi enviado para o e-mail indicado.
              Por favor, verifica a tua caixa de entrada 
              , <span className="font-bold">incluindo o spam</span>!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={cooldown.throttle(onSubmit)} method="post">
              <Button type="submit" className="w-full" disabled={cooldown.active}>
                Não recebi nada...
              </Button>
              {cooldown.active && (
                <p className="text-muted-foreground text-xs mt-2">
                  Por favor espera {cooldown.secondsLeft} segundos antes de tentar novamente.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </CardLayout>
    </BaseLayout>
  )
}


