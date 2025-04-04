import { Container, Heading, Text, Img, Body, Section } from "@react-email/components";
import { BaseLayout } from "../common/layouts/base.js";

export type EmailChangedConfirmationProps = {
  logoUrl: string;
  email: string;
  oldEmail: string;
  newEmail: string;
};

const EmailChangedConfirmation = ({
  logoUrl,
  email,
  oldEmail,
  newEmail,
  confirmationLink,
  cancelationLink,
}: EmailChangeProps) => {
  return (
    <BaseLayout>
      <Body>
        <Container>
          <Section className="bg-primary text-primary-foreground rounded-xl p-[16px_32px_32px] font-medium">
            <Img src={logoUrl} alt="Logótipo do ENEI 2025" height={50} />
            <Heading className="mt-[32px] text-[24px]">E-mail alterado.</Heading>
            <Text>
              O e-mail da sua conta foi alterado de {oldEmail} para {newEmail}.
            </Text>
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

EmailChangedConfirmation.defaultProps = {
  logoUrl: "https://www.eneiconf.pt/images/logo-white.svg",
  email: "participante@eneiconf.pt",
  oldEmail: "participante@eneiconf.pt",
  newEmail: "novoparticipante@eneiconf.pt",
};

export default EmailChangedConfirmation;
