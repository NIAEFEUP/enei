import env from "#start/env";
import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class LogoutIfAuthenticationDisabledMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (env.get("FEATURES_DISABLE_AUTH")) {
      await ctx.auth.use("web").logout();
    }

    return next();
  }
}
