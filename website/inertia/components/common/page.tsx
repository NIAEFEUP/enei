import { Head } from '@inertiajs/react'
import React from 'react'
import { cn } from '~/lib/utils'
import { Navbar } from './navbar'
import { Toaster } from '~/components/ui/toaster'
import { useAuth } from '~/hooks/use_auth'
import { Notification } from '../notifications'
import Footer from './footer'

function PromoterNotification() {
  const auth = useAuth()

  if (auth.state !== 'authenticated' || auth.user.role !== 'promoter') return null

  return (
    <Notification>
      <div className="bg-red-500 px-4 shadow-[0_4px_4px_rgba(0_0_0_/_25%)]">
        <p className="font-bold text-center">Conta de Promotor</p>
      </div>
    </Notification>
  )
}

export default function Page({
  title,
  className,
  children,
  variant = 'blue',
}: {
  title: string
  className?: string
  variant?: "blue" | "beige"
  children?: React.ReactNode
}) {
  return (
    <div className='w-full min-h-dvh scroll-smooth relative flex flex-col'>
      <Head title={title} />
      <Navbar className="sticky top-0 z-20 grow-0" variant={variant} />
      <PromoterNotification />
      <Toaster />
      <div className={cn("relative pb-40", className)}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
