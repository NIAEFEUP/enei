import type User from '#models/user'
import env from '#start/env'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

export type AuthenticationData =
  | { state: 'disabled' }
  | { state: 'unauthenticated' }
  | { state: 'authenticated'; user: Pick<User, 'email' | 'role'> }

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    environment: env.public(),
    auth: async ({ auth }): Promise<AuthenticationData> => {
      if (env.get('FEATURES_DISABLE_AUTH')) return { state: 'disabled' }

      if (!auth.authenticationAttempted) await auth.check()
      const user = auth.user

      if (!user) return { state: 'unauthenticated' }
      await user.load('participantProfile')
      return { state: 'authenticated', user: { email: user.email, role: user.role } }
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
