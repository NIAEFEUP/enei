import env from '#start/env'
import router from '@adonisjs/core/services/router'

const base = env.get('INERTIA_PUBLIC_APP_URL')

export function staticUrl(path: string) {
  return new URL(path, base).toString()
}

export function buildUrl() {
  return router.builder().prefixUrl(base)
}
