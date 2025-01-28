import Container from '.'

export default function CardContainer({ children }: { children?: React.ReactNode }) {
  return <Container className="mt-24 max-w-md">{children}</Container>
}
