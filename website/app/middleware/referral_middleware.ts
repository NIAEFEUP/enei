import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ReferralMiddleware {
  handle(ctx: HttpContext, next: NextFn) {
    const referralInput: string = ctx.request.input('ref')

    if (referralInput !== undefined) {
      // If received referral, store as cookie
      ctx.response.cookie('referral', [{ referralInput }])
    }

    return next()
  }
}
