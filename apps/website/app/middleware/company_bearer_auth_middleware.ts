import type { HttpContext } from "@adonisjs/core/http";
import type { NextFn } from "@adonisjs/core/types/http";
import env from "#start/env";
import { safeEqual } from "@adonisjs/core/helpers";

export default class CompanyBearerAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const authHeader = ctx.request.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.response.unauthorized({ error: "Missing or invalid Authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!safeEqual(env.get("COMPANY_BEARER_TOKEN"), token)) {
      return ctx.response.unauthorized({ error: "Invalid token" });
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next();
    return output;
  }
}
