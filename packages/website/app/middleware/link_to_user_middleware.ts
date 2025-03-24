import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";
import { referralCodeCookie } from "../cookies/referrals_cookies.js";
import ReferralService from "#services/referral_service";
import { inject } from "@adonisjs/core";

@inject()
export default class LinkToUserMiddleware {
  constructor(private referralService: ReferralService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const referralCode = referralCodeCookie.get(ctx);

    if (referralCode) {
      if (!ctx.auth.authenticationAttempted) await ctx.auth.check();

      const user = ctx.auth.user;
      if (user) {
        referralCodeCookie.clear(ctx);

        const referrer = await this.referralService.getReferrerByCode(referralCode);
        if (referrer) {
          await this.referralService.linkUserToReferrer(user, referrer);
        }
      }
    }

    return next();
  }
}
