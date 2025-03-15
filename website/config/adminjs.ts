import type { AdminJSProviderConfig } from '@adminjs/adonis'

import componentLoader from '../app/admin/component_loader.js'
import authProvider from '../app/admin/auth.js'

import AccountResource from '../app/admin/resources/account.js'
import OrderProductResource from '../app/admin/resources/order_product.js'
import OrderResource from '../app/admin/resources/order.js'
import ParticipantProfileResource from '../app/admin/resources/participant_profile.js'
import ProductGroupResource from '../app/admin/resources/product_group.js'
import ProductResource from '../app/admin/resources/product.js'
import PromoterProfileResource from '../app/admin/resources/promoter_profile.js'
import UserActivityResource from '../app/admin/resources/user_activity.js'
import UserResource from '../app/admin/resources/user.js'

const resources = [
  AccountResource,
  OrderProductResource,
  OrderResource,
  ParticipantProfileResource,
  ProductGroupResource,
  ProductResource,
  PromoterProfileResource,
  UserActivityResource,
  UserResource,
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
