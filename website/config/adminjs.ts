import { AdminJSProviderConfig, LucidResource } from '@adminjs/adonis'

import componentLoader from '../app/admin/component_loader.js'
import authProvider from '../app/admin/auth.js'
import User from '#models/user'
import Ticket from '#models/ticket'

const resources = [new LucidResource(User, 'sqlite'), new LucidResource(Ticket, 'sqlite')]

const adminjsConfig: AdminJSProviderConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    componentLoader,
    resources: resources.map((Resource) => ({
      resource: Resource,
      options: {
        properties: {
          createdAt: {
            isVisible: { list: true, filter: false, show: true, edit: false },
          },
          updatedAt: {
            isVisible: { list: true, filter: false, show: true, edit: false },
          },
        },
      },
    })),
    pages: {},
    locale: {
      availableLanguages: ['en'],
      language: 'en',
      translations: {
        en: {
          actions: {},
          messages: {},
          labels: {},
          buttons: {},
          properties: {},
          components: {},
          pages: {},
          ExampleResource: {
            actions: {},
            messages: {},
            labels: {},
            buttons: {},
            properties: {},
          },
        },
      },
    },
    branding: {
      companyName: 'AdminJS',
      theme: {},
    },
    settings: {
      defaultPerPage: 10,
    },
  },
  auth: {
    enabled: true,
    provider: authProvider,
    middlewares: [],
  },
  middlewares: [],
}

export default adminjsConfig
