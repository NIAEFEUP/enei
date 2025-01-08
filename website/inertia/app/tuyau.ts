import { createTuyau } from '@tuyau/client'
import { api } from '#.adonisjs/api'

export const tuyau = createTuyau({
  api,
  baseUrl: import.meta.env.VITE_APP_URL,
})
