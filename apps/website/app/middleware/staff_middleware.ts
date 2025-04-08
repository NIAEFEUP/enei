import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";

export default class StaffMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail();

    if (!user.isStaff()) {
      ctx.session.flashErrors({ message: "Unauthorized"})
      return ctx.response.redirect().back()
    }

    return await next();
  }
}
