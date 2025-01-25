import { Head } from '@inertiajs/react'
import { Navbar } from '~/components/common/navbar'
import { Toaster } from '~/components/ui/toaster'
import { cn } from '~/lib/utils'

type Props = {
  title: string
  children?: React.ReactNode
  className?: string
}

export default function BaseLayout({ title, children, className }: Props) {
  return (
    <div className="w-full min-h-dvh bg-enei-blue scroll-smooth relative flex flex-col">
      <Head title={title} />
      <Navbar className="sticky top-0 z-10" />
      <div className={cn('flex-1', className)}>
        {children}
        <Toaster />
      </div>
    </div>
  )
}
