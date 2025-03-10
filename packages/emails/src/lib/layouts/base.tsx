import { Html } from '@react-email/components'
import { cn } from '@enei/utils/cn'
import { Tailwind } from '#components/tailwind.js'

export const BaseLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Tailwind>
      <Html className={cn('mt-[16px] font-sans', className)}>{children}</Html>
    </Tailwind>
  )
}
