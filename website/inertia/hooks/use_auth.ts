import { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'

export function useAuth() {
  return usePage<SharedProps>().props.auth
}
