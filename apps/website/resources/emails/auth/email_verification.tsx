import {
  Button,
  Container,
  Heading,
  Text,
  Img,
  Body,
  Section,
  Link,
} from "@react-email/components";
import { BaseLayout } from "../common/layouts/base.js";

export type EmailVerificationProps = {
  logoUrl: string;
  email: string;
  verificationLink: string;
};

const EmailVerification = ({ logoUrl, email, verificationLink }: EmailVerificationProps) => {
  return (
    <BaseLayout>
      <Body>
        <Container>
          <Section className="bg-primary text-primary-foreground rounded-xl p-[16px_32px_32px] font-medium">
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
              className="bg-secondary text-secondary-foreground mt-[32px] rounded-md p-[10px_20px]"
            >
              Confirmar e-mail
            </Button>
          </Section>
          <Section>
            <Text className="text-primary px-[50px] text-center">
              Este e-mail foi enviado automaticamente para:{" "}
              <span className="underline">{email}</span>.
              <br />
              Se não criaste uma conta em{" "}
              <Link href="https://eneiconf.pt" className="text-inherit underline">
                eneiconf.pt
              </Link>
              , podes ignorar este e-mail.
            </Text>
          </Section>
        </Container>
      </Body>
    </BaseLayout>
  );
};

EmailVerification.defaultProps = {
  logoUrl: "https://www.eneiconf.pt/images/logo-white.svg",
  email: "participante@eneiconf.pt",
  verificationLink: "https://www.eneiconf.pt/auth/verify?email=participante@eneiconf.pt",
};

export default EmailVerification;
