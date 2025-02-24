import { getRedirect } from "#lib/redirect.js";
import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class FinishRedirectMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const redirect = getRedirect(ctx);

    if (redirect) {
      return ctx.response.redirect(redirect);
    }

    return next();
  }
}
