import { Link } from '@tuyau/inertia/react'
import { buttonVariants } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import BaseLayout from '~/layouts/base'
import CardLayout from '~/layouts/card'

export default function EmailVerification() {
  return (
    <BaseLayout title="Palavra-passe alterada">
      <CardLayout>
        <Card>
          <CardHeader>
            <CardTitle>A tua palavra-passe foi alterada com sucesso!</CardTitle>
          </CardHeader>
          <CardContent>
            <Link route="pages:auth.login" className={buttonVariants()}>
              Ir para a página de login
            </Link>
          </CardContent>
        </Card>
      </CardLayout>
    </BaseLayout>
  )
}
