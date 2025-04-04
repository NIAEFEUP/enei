import { cn } from "@enei/shadcn/cn";
import Container from ".";

export default function CardContainer({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <Container className={cn("mb-40 mt-24 w-full max-w-md", className)}>{children}</Container>;
}
