import type { AdminJSProviderConfig } from '@adminjs/adonis'

import componentLoader from '../app/admin/component_loader.js'
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

const adminjsConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    componentLoader,
    resources,
    branding: {
      companyName: 'ENEI - Admin',
      logo: '/images/logo-blue.svg',
    },
  },
  auth: {
    enabled: true,
    provider: authProvider,
  },
} satisfies AdminJSProviderConfig

export default adminjsConfig
