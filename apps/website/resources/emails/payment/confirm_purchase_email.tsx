import { Container, Heading, Text, Img, Body, Section } from "@react-email/components";
import { BaseLayout } from "../common/layouts/base.js";

export type ProductWithQuantity = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type MailProps = {
  logoUrl: string;
  userEmail: string;
  products: ProductWithQuantity[];
  total: number;
  orderId: number;
};

const ConfirmPurchaseEmail = ({ logoUrl, products, total, userEmail }: MailProps) => {
  return (
    <BaseLayout>
      <Body>
        <Container>
          <Section className="bg-primary text-primary-foreground rounded-xl p-[16px_32px_32px] font-medium">
            <Img src={logoUrl} alt="Logótipo do ENEI 2025" height={50} />
            <Heading className="mt-[32px] text-[24px]">Obrigado pela tua compra!</Heading>
            <Text>A tua inscrição no ENEI 2025 foi confirmada com sucesso!</Text>

            <Heading as="h2" className="mt-[24px] text-[20px]">
              Resumo da Compra
            </Heading>
            {products.map((product) => (
              <Text key={product.name}>
                {product.name} - €{product.price} x {product.quantity}
              </Text>
            ))}
            <Text className="font-bold">Total: €{total}</Text>
          </Section>

          <Section>
            <Text className="text-primary px-[50px] text-center">
              Este e-mail foi enviado para: <span className="underline">{userEmail}</span>
            </Text>
          </Section>
        </Container>
      </Body>
    </BaseLayout>
  );
};
export default ConfirmPurchaseEmail;
