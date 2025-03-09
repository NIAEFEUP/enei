import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import { useMemo } from 'react'

export function useEnvironment<T>(mapper: (environment: SharedProps['environment']) => T) {
  const { environment } = usePage<SharedProps>().props
  return useMemo(() => mapper(environment), [environment])
}
