import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class HasPurchasedTicketMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = await ctx.auth.getUserOrFail();
    await user.loadOnce("participantProfile");

    if (user.participantProfileId !== null) {
      await user.loadOnce("participantProfile");

      if (user.participantProfile!.purchasedTicket !== null) {
        return next();
      }
    }

    return ctx.response.redirect().toRoute("pages:tickets");
  }
}
