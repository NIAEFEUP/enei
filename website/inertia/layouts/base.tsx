import { Head } from '@inertiajs/react'
import NavBar from '../components/navbar'
import { Toaster } from '~/components/ui/toaster'
import { cn } from '~/lib/utils'

type Props = {
  title: string,
  children?: React.ReactNode
  className?: string
}

export default function BaseLayout({ title, children, className }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-enei-blue scroll-smooth">
      <Head title={title} />
      <div className="sticky left-0 right-0 top-0 z-30 flex-none">
        <NavBar />
      </div>
      <div className={cn('flex-1', className)}>
        {children}
        <Toaster />
      </div>
    </div>
  )
}
