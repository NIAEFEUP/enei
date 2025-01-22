import { Link } from '@tuyau/inertia/react'
import BaseLayout from '~/layouts/base'

export default function EmailVerification() {
  return (
    <BaseLayout title="E-mail confirmado">
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">O teu e-mail foi confirmado!</h1>
          <p className="text-gray-500">Podes carregar <Link route="pages:home">aqui</Link> para ir para a página inicial.</p>
        </div>
      </div>
    </BaseLayout>
  )
}
