import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class NoVerifiedEmailMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail();

    if (user.isEmailVerified()) {
      return ctx.response.redirect().toRoute("pages:home");
    }

    return next();
  }
}
