import { Container, Heading, Text, Img, Body, Section} from '@react-email/components'
import { BaseLayout } from '#layouts/base.js'

export type ProductWithQuantity = {
    name: string
    price: number
    quantity: number
  }
  
export type ConfirmPurchaseEmailProps = {
    logoUrl: string
    email: string
    products: ProductWithQuantity[]
    total: number
  }

const ConfirmPurchaseEmail = ({ logoUrl, products, total, email }: ConfirmPurchaseEmailProps) => {
    return (
        <BaseLayout>
            <Body>
                <Container>
                    <Section className="p-[16px_32px_32px] bg-primary font-medium text-primary-foreground rounded-xl">
                        <Img src={logoUrl} alt="Logótipo do ENEI 2025" height={50} />
                        <Heading className="mt-[32px] text-[24px]">Obrigado pela tua compra!</Heading>
                        <Text>A tua inscrição no ENEI 2025 foi confirmada com sucesso!</Text>
                        
                        <Heading as="h2" className="text-[20px] mt-[24px]">Resumo da Compra</Heading>
                        {products.map((product) => (
                            <Text key={product.name}>
                                {product.name} - €{product.price} x {product.quantity}
                            </Text>
                        ))}
                        <Text className="font-bold">Total: €{total}</Text>
                    </Section>
                    
                    <Section>
                        <Text className="text-primary text-center px-[50px]">
                            Este e-mail foi enviado para: <span className="underline">{email}</span>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </BaseLayout>
    )
}

ConfirmPurchaseEmail.defaultProps = {
    logoUrl: 'https://eneiconf.pt/images/logo-white.svg',
    email: 'participante@eneiconf.pt',
    products: [
        {
            name: 'Bilhete Early Bird - Com Alojamento',
            price: 35,
            quantity: 1
        }
    ],
    total: 35,
} satisfies React.ComponentProps<typeof ConfirmPurchaseEmail>;

export default ConfirmPurchaseEmail