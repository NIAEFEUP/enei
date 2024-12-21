import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import * as jose from 'jose'

import { oidcRenewTokens } from '../lib/oidc.js';

export default class OidcTokenRefresherMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx;

    const refresh_token = jose.decodeJwt(request.cookie("refresh_token"));
    const access_token = jose.decodeJwt(request.cookie("access_token"));

    const refresh_token_expired = new Date(refresh_token.exp * 1000) < new Date();
    const access_token_expired = new Date(access_token.exp * 1000) < new Date();

    if ((refresh_token && access_token) && (refresh_token_expired || access_token_expired)) {
      try {
        const res = await oidcRenewTokens(refresh_token.refresh_token); 

        if (res.ok) {
          const newTokens = await res.json();

          ctx.response
            .cookie('access_token', newTokens.access_token, { expires: new Date((new Date()).getTime() + (newTokens.expires_in)) })
            .cookie('refresh_token', newTokens.refresh_token, { expires: new Date((new Date()).getTime() + (newTokens.expires_in)) })
        }
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * Call next method in the pipeline and return its output
     */
    await next();
  }
}