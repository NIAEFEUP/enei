import { cn } from '@enei/utils/cn'

export default function Container({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return <div className={cn('w-full container mx-auto px-4 md:px-8', className)}>{children}</div>
}
