import type User from '#models/user'
import env from '#start/env'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

type AuthenticationData =
  | { authenticated: false }
  | { authenticated: true; user: Pick<User, 'email'> }

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
    auth: async ({ auth, inertia })  => {
      return inertia.always(async (): Promise<AuthenticationData> => {
        if (!auth.authenticationAttempted) await auth.check()

        const user = auth.user
        if (!user) return { authenticated: false }
        return { authenticated: true, user: { email: user.email } }
      })
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
