import { Provider as JotaiProvider } from 'jotai/react'
import { TuyauProvider } from './tuyau'

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <TuyauProvider>
      <JotaiProvider>{children}</JotaiProvider>
    </TuyauProvider>
  )
}
