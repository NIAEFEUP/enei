import { Provider as JotaiProvider } from 'jotai/react'
import { TuyauProvider } from './tuyau'
import { NotificationProvider } from '~/components/notifications'

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <TuyauProvider>
      <JotaiProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </JotaiProvider>
    </TuyauProvider>
  )
}
