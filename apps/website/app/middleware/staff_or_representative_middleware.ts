import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class StaffOrRepresentativeMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail();

    if (user.isRepresentative() || user.isStaff()) {
      return await next();
    } else {
      ctx.session.flashErrors({ message: "Unauthorized" });
      return ctx.response.redirect().back();
    }
  }
}
