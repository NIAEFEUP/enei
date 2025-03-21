import { api } from '#.adonisjs/api'
import { createTuyau } from '@tuyau/client'
import { TuyauProvider as $TuyauProvider } from '@tuyau/inertia/react'
import { useEnvironment } from '~/hooks/use_env'

export type TuyauClient = ReturnType<typeof useTuyau>

function useTuyau() {
  const tuyau = useEnvironment((env) =>
    createTuyau({
      api,
      baseUrl: env.INERTIA_PUBLIC_APP_URL,
    })
  )

  return tuyau
}

export function TuyauProvider({ children }: { children?: React.ReactNode }) {
  const tuyau = useTuyau()
  return <$TuyauProvider client={tuyau}>{children}</$TuyauProvider>
}
