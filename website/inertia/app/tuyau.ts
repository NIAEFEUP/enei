import { createTuyau } from '@tuyau/client'
import { api } from '#.adonisjs/api'

console.log(import.meta.env.BASE_URL)
export const tuyau = createTuyau({
  api,
  baseUrl: 'http://localhost:3333',
})
