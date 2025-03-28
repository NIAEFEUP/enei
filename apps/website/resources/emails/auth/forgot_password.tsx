import { Button, Container, Heading, Text, Img, Body, Section } from "@react-email/components";
import { BaseLayout } from "../common/layouts/base.js";

export type EmailVerificationProps = {
  logoUrl: string;
  email: string;
  verificationLink: string;
};

const ForgotPassword = ({ logoUrl, email, verificationLink }: EmailVerificationProps) => {
  return (
    <BaseLayout>
      <Body>
        <Container>
          <Section className="bg-primary text-primary-foreground rounded-xl p-[16px_32px_32px] font-medium">
            <Img src={logoUrl} alt="Logótipo do ENEI 2025" height={50} />
            <Heading className="mt-[32px] text-[24px]">Repõe a tua palavra-passe!</Heading>
            <Text>
              Ao clicares no botão abaixo, irás para uma página onde conseguirás repôr a tua
              palavra-passe.
            </Text>
            <Button
              href={verificationLink}
              className="bg-secondary text-secondary-foreground mt-[32px] rounded-md p-[10px_20px]"
            >
              Repôr palavra-passe
            </Button>
          </Section>
          <Section>
            <Text className="text-primary px-[50px] text-center">
              Este e-mail foi enviado automaticamente para:{" "}
              <span className="underline">{email}</span>.
              <br />
              Se não efetuaste este pedido, podes ignorar este e-mail.
            </Text>
          </Section>
        </Container>
      </Body>
    </BaseLayout>
  );
};

ForgotPassword.defaultProps = {
  logoUrl: "https://www.eneiconf.pt/images/logo-white.svg",
  email: "participante@eneiconf.pt",
  verificationLink: "https://www.eneiconf.pt/auth/forgot/callback?email=participante@eneiconf.pt",
};

export default ForgotPassword;
