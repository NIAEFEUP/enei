import { Toaster } from '~/components/ui/toaster'

export default function BaseLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
