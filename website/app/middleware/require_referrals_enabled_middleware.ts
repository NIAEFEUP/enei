import ReferralsDisabledException from '#exceptions/referrals_disabled_exception'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RequireReferralsEnabledMiddleware {
  async handle(_ctx: HttpContext, next: NextFn) {
    if (env.get('REFERRALS_ACTIVATION_DATE') > new Date()) {
      throw new ReferralsDisabledException()
    }
    
    return next()
  }
}
