import { api } from '#.adonisjs/api'
import { createTuyau } from '@tuyau/client'
import { TuyauProvider } from '@tuyau/inertia/react'
import { useEnvironment } from '~/hooks/use_env'

export function TuyauWrapper({ children }: { children?: React.ReactNode }) {
  const tuyau = useEnvironment((env) =>
    createTuyau({
      api,
      baseUrl: env.INERTIA_PUBLIC_APP_URL,
    })
  )

  return <TuyauProvider client={tuyau}>{children}</TuyauProvider>
}
