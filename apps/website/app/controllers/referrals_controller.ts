import type { HttpContext } from "@adonisjs/core/http";
import { referralCodeCookie } from "../cookies/referrals_cookies.js";
import ReferralService from "#services/referral_service";
import { inject } from "@adonisjs/core";

@inject()
export default class ReferralsController {
  constructor(private referralService: ReferralService) {}

  async showReferralLink(ctx: HttpContext) {
    const user = ctx.auth.getUserOrFail();
    const referralLink = await this.referralService.getReferralLink(user);
    const referralCount = await this.referralService.getReferralCount(user);
    const indirectReferralCount = await this.referralService.getIndirectReferralCount(user);

    return ctx.inertia.render("referrals", { referralLink, referralCount, indirectReferralCount });
  }

  async link(ctx: HttpContext) {
    const referralCode = ctx.params.referralCode as string;
    const referrer = await this.referralService.getReferrerByCode(referralCode);

    ctx.logger.debug(referrer, "Referrer with code %s", referralCode);

    if (referrer) {
      const user = ctx.auth.user;
      if (user) {
        await this.referralService.linkUserToReferrer(user, referrer);
      } else {
        referralCodeCookie.set(ctx, referralCode, { maxAge: 7 * 24 * 3600 });
      }
    }

    return ctx.response.redirect().toRoute("pages:home");
  }
}
