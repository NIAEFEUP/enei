/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/ally.ts" />
/// <reference path="../../config/auth.ts" />
/// <reference path="../../config/inertia.ts" />
/// <reference path="../../config/limiter.ts" />
/// <reference path="../../config/redis.ts" />

import '../css/app.css'

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { hydrateRoot } from 'react-dom/client'
import { Providers } from './providers'

const appName = import.meta.env.VITE_APP_NAME || 'ENEI'

createInertiaApp({
  progress: { color: 'var(--primary)' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}/page.tsx`, import.meta.glob('../pages/**/page.tsx'))
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
