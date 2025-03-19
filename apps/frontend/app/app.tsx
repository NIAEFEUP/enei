import '#resources/css/app.css'

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { hydrateRoot } from 'react-dom/client'
import { Providers } from './providers'

const appName = import.meta.env.VITE_APP_NAME || 'ENEI'

createInertiaApp({
  progress: { color: 'var(--progress-bar)' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}/page.tsx`,
      import.meta.glob('../pages/**/page.tsx')
    )
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <>
        <App {...props}>
          {(page) => (
            <Providers>
              <page.Component key={page.key} {...page.props} />
            </Providers>
          )}
        </App>
      </>
    )
  },
})
