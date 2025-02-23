import { Head } from '@inertiajs/react'
import React from 'react'
import { cn } from '~/lib/utils'
import { Navbar } from './navbar'
import {Toaster} from '~/components/ui/toaster'
export default function Page({
  title,
  className,
  children,
  variant = "blue"
}: {
  title: string
  className?: string
  variant?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('w-full min-h-dvh scroll-smooth relative flex flex-col', className)}>
      <Head title={title} />
      <Navbar className="sticky top-0 z-20 grow-0" variant={variant}/>
      <Toaster />

      {children}
    </div>
  )
}
