import { Html } from '@react-email/components'
import { Tailwind } from '../tailwind.js'

export const BaseLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Tailwind>
      <Html className={className}>{children}</Html>
    </Tailwind>
  )
}
