import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";
import env from "#start/env";
import { safeEqual } from "@adonisjs/core/helpers";

export default class CompanyAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const token = ctx.request.header("X-API-Token");

    if (!token) {
      return ctx.response.unauthorized({ error: "Missing or invalid Authorization header" });
    }

    if (!safeEqual(env.get("COMPANY_API_TOKEN"), token)) {
      return ctx.response.unauthorized({ error: "Invalid token" });
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next();
    return output;
  }
}
