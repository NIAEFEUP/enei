import AuthenticationDisabledException from "#exceptions/authentication_disabled_exception";
import env from "#start/env";
import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class RequireAuthenticationEnabledMiddleware {
  async handle(_ctx: HttpContext, next: NextFn) {
    if (env.get("FEATURES_DISABLE_AUTH")) {
      throw new AuthenticationDisabledException();
    }

    return next();
  }
}
