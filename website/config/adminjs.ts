import type { AdminJSProviderConfig } from "@adminjs/adonis"

import componentLoader, { components } from '../app/admin/component_loader.js'
import authProvider from '../app/admin/auth.js'
import UserResource from "../app/admin/resources/user_resource.js"
import PromoterProfileResource from "../app/admin/resources/promoter_info_resource.js"
import OrderResource from "../app/admin/resources/order_resource.js"
import ProductResource from "../app/admin/resources/product_resource.js"
import UserActivityResource from "../app/admin/resources/user_activity_resource.js"
import UserActivity from "#models/user_activity"

const resources = [
  UserResource,
  PromoterProfileResource,
  UserActivityResource,
  OrderResource,
  ProductResource
]

const adminjsConfig: AdminJSProviderConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    dashboard: {
      component: components.CustomDashboard,
      handler: async () => {
        const userActivities = (await UserActivity.query().where('type', '=', 'referral'))
        const points = 0 // (await User.all()).reduce((acc, user) => acc + user.points, 0)

        return { 
          userActivities, 
          points 
        }
      },
    },
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
