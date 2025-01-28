import { Link } from '@tuyau/inertia/react'
import CardContainer from '~/components/common/containers/card'
import Page from '~/components/common/page'
import { buttonVariants } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

export default function EmailVerification() {
  return (
    <Page title="E-mail confirmado">
      <CardContainer>
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
      </CardContainer>
    </Page>
  )
}
