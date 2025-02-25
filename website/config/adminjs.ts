import type { AdminJSProviderConfig } from "@adminjs/adonis"

import componentLoader from '../app/admin/component_loader.js'
import authProvider from '../app/admin/auth.js'
import UserResource from "../app/admin/resources/user_resource.js"
import PromoterProfileResource from "../app/admin/resources/promoter_info_resource.js"
import OrderResource from "../app/admin/resources/order_resource.js"
import ProductResource from "../app/admin/resources/product_resource.js"

const resources = [
  UserResource,
  PromoterProfileResource,
  OrderResource,
  ProductResource
]

const adminjsConfig: AdminJSProviderConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    componentLoader,
    resources: resources,
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
      companyName: 'ENEI - Admin',
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
