import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";
import { notifications } from "#lib/adonisjs/notifications.js";
export default class HasPurchasedTicketMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail();

    if (user.participantProfileId !== null) {
      await user.loadOnce("participantProfile");

      if (user.participantProfile!.purchasedTicket !== null) {
        return next();
      }
    }

    notifications.push(ctx.session, {
      title: "Erro",
      description: "Precisas de comprar um bilhete primeiro!",
      variant: "destructive",
    });

    return ctx.response.redirect().toRoute("pages:tickets");
  }
}
