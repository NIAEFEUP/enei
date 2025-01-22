import { Link } from '@tuyau/inertia/react'
import { buttonVariants } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import BaseLayout from '~/layouts/base'
import CardLayout from '~/layouts/card'

export default function EmailVerification() {
  return (
    <BaseLayout title="E-mail confirmado">
      <CardLayout>
        <Card>
          <CardHeader>
            <CardTitle>O teu e-mail foi confirmado!</CardTitle>
            <CardDescription>Obrigado por confirmares o teu e-mail no ENEI 2025!</CardDescription>
          </CardHeader>
          <CardContent>
            <Link route="pages:home" className={buttonVariants()}>
              Ir para a página inicial
            </Link>
          </CardContent>
        </Card>
      </CardLayout>
    </BaseLayout>
  )
}
