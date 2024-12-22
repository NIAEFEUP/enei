import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import * as jose from 'jose'
import type { OidcTokenResponse } from '../../types/oidc.ts';

import { oidcRenewTokens } from '../lib/oidc.js';
import { Exception } from '@adonisjs/core/exceptions';

export default class OidcTokenRefresherMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx;

    const refresh_token_cookie = request.cookie("refresh_token");
    const access_token_cookie = request.cookie("access_token");

    if(refresh_token_cookie === undefined || access_token_cookie === undefined) {
      return await next();
    }

    const refresh_token = jose.decodeJwt(refresh_token_cookie);
    const access_token = jose.decodeJwt(access_token_cookie);

    if(!refresh_token.exp || !access_token.exp) {
      throw new Exception("Invalid tokens");
    }

    const refresh_token_expired = new Date(refresh_token.exp * 1000) < new Date();
    const access_token_expired = new Date(access_token.exp * 1000) < new Date();

    if (refresh_token_expired || access_token_expired) {
      try {
        const res = await oidcRenewTokens(refresh_token_cookie); 

        if (res.ok) {
          const newTokens: OidcTokenResponse = await res.json() as OidcTokenResponse;

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