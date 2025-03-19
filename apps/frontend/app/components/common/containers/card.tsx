import { cn } from '@enei/utils/cn';
import Container from '.'

export default function CardContainer({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <Container className={cn("mt-24 w-full max-w-md", className)}>{children}</Container>
}
