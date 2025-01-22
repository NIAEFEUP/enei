import { Button, Container, Heading, Text, Img, Body, Section, Link } from '@react-email/components'
import { BaseLayout } from '../common/layouts/base.js'

export type EmailVerificationProps = {
  logoUrl: string
  email: string
  verificationLink: string
}

const EmailVerification = ({ logoUrl, email, verificationLink }: EmailVerificationProps) => {
  return (
    <BaseLayout>
      <Body>
        <Container>
          <Section className="p-[16px_32px_32px] bg-primary font-medium text-primary-foreground rounded-xl">
            <Img src={logoUrl} alt="Logótipo do ENEI 2025" height={50} />
            <Heading className="mt-[32px] text-[24px]">Confirma o teu e-mail!</Heading>
            <Text>
              Obrigado por teres criado uma conta no ENEI 2025! Antes de poderes aceder à tua conta,
              precisamos de confirmar o teu e-mail.
            </Text>
            <Text>
              Depois da confirmação, poderás aceder à mesma através da página de login, disponível
              no website do ENEI 2025.
            </Text>
            <Button
              href={verificationLink}
              className="bg-secondary text-secondary-foreground rounded-md p-[10px_20px] mt-[32px]"
            >
              Confirmar e-mail
            </Button>
          </Section>
          <Section>
            <Text className="text-primary text-center px-[50px]">
              Este e-mail foi enviado automaticamente para: <span className='underline'>{email}</span>.
              <br />
              Se não criaste uma conta em{' '}
              <Link href="https://eneiconf.pt" className='text-inherit underline'>eneiconf.pt</Link>, podes ignorar este
              e-mail.
            </Text>
          </Section>
        </Container>
      </Body>
    </BaseLayout>
  )
}

EmailVerification.defaultProps = {
  logoUrl: 'https://eneiconf.pt/images/logo-white.svg',
  email: 'participante@eneiconf.pt',
  verificationLink: 'https://eneiconf.pt/auth/verify?email=participante@eneiconf.pt',
}

export default EmailVerification
