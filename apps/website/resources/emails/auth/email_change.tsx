import { Button, Container, Heading, Text, Img, Body, Section } from "@react-email/components";
import { BaseLayout } from "../common/layouts/base.js";

export type EmailChangeProps = {
  logoUrl: string;
  email: string;
  oldEmail: string;
  newEmail: string;
  confirmationLink: string;
  cancelationLink: string;
};

const EmailChange = ({
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
            <Heading className="mt-[32px] text-[24px]">Alteração de e-mail!</Heading>
            <Text>
              Foi efetuado um pedido para alterar o e-mail da tua conta de {oldEmail} para{" "}
              {newEmail}.
              <br />
              Por favor confirma que fizeste este pedido. Caso não o tenhas feito, clica em
              "Cancelar".
              <br />A alteração será feita apenas se houver confirmação de ambos os e-mails.
            </Text>
            <div className="flex flex-row gap-2">
              <Button
                href={cancelationLink}
                className="bg-secondary text-secondary-foreground mt-[32px] rounded-md p-[10px_20px]"
              >
                Cancelar
              </Button>
              <Button
                href={confirmationLink}
                className="bg-secondary text-secondary-foreground mt-[32px] rounded-md p-[10px_20px]"
              >
                Confirmar
              </Button>
            </div>
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

EmailChange.defaultProps = {
  logoUrl: "https://www.eneiconf.pt/images/logo-white.svg",
  email: "participante@eneiconf.pt",
  oldEmail: "participante@eneiconf.pt",
  newEmail: "novoparticipante@eneiconf.pt",
  cancelationLink:
    "https://www.eneiconf.pt/auth/email/change/cancel/callback?id=1&email=participante@eneiconf.pt",
  confirmationLink:
    "https://www.eneiconf.pt/auth/email/change/confirm/callback?id=1&email=participante@eneiconf.pt",
};

export default EmailChange;
