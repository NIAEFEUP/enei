import { Html } from '@react-email/components'
import { Tailwind } from '../tailwind.js'
import { cn } from '../cn.js'

export const BaseLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Tailwind>
      <Html className={cn("mt-[16px]", className)}>{children}</Html>
    </Tailwind>
  )
}
