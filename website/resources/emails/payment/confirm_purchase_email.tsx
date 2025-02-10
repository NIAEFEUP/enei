import { Container, Heading, Text, Img, Body, Section} from '@react-email/components'
import { BaseLayout } from '../common/layouts/base.js'
export type ProductWithQuantity = {
    id: number
    name: string
    price: number
    quantity: number
  }
  
export type MailProps = {
    logoUrl: string
    userEmail: string
    products: ProductWithQuantity[]
    total: number
    orderId: number
  }

const ConfirmPurchaseEmail = ({ logoUrl, products, total, userEmail }: MailProps) => {
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
                            Este e-mail foi enviado para: <span className="underline">{userEmail}</span>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </BaseLayout>
    )
}
export default ConfirmPurchaseEmail