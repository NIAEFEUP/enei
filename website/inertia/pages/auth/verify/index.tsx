import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { useTuyau } from '~/hooks/use_tuyau'
import AppLayout from '~/layouts/applayout'

export default function EmailVerification() {
  const tuyau = useTuyau()

  const { post } = useForm()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(tuyau.$url('actions:auth.verify.send'))
  }

  return (
    <AppLayout title="Registo bem-sucedido">
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Confirmação de E-mail</h1>
          <p className="text-gray-500">Um e-mail de confirmação foi enviado para você.</p>
          <p className="text-gray-500">Por favor, siga o link para confirmar seu e-mail.</p>
        </div>
      </div>
      <form onSubmit={onSubmit} method="post">
        <Button type="submit" className="w-full bg-enei-blue">
          Confirmar E-mail
        </Button>
      </form>
    </AppLayout>
  )
}
