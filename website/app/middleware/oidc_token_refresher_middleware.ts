import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import * as jose from 'jose'
import type { OidcTokenResponse } from '../../types/oidc.ts'

import { oidcRenewTokens } from '../lib/oidc.js'
import { Exception } from '@adonisjs/core/exceptions'

export default class OidcTokenRefresherMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx

    const refreshTokenCookie = request.cookie('refresh_token')
    const accessTokenCookie = request.cookie('access_token')

    if (refreshTokenCookie === undefined || accessTokenCookie === undefined) {
      return await next()
    }

    const refreshToken = jose.decodeJwt(refreshTokenCookie)
    const accessToken = jose.decodeJwt(accessTokenCookie)

    if (!refreshToken.exp || !accessToken.exp) {
      throw new Exception('Invalid tokens')
    }

    const refreshTokenExpired = new Date(refreshToken.exp * 1000) < new Date()
    const accessTokenExpired = new Date(accessToken.exp * 1000) < new Date()

    if (refreshTokenExpired || accessTokenExpired) {
      try {
        const res = await oidcRenewTokens(refreshTokenCookie)

        if (res.ok) {
          const newTokens: OidcTokenResponse = (await res.json()) as OidcTokenResponse

          ctx.response
            .cookie('access_token', newTokens.access_token, {
              expires: new Date(new Date().getTime() + newTokens.expires_in),
            })
            .cookie('refresh_token', newTokens.refresh_token, {
              expires: new Date(new Date().getTime() + newTokens.expires_in),
            })
        }
      } catch (e) {
        console.error(e)
      }
    }

    /**
     * Call next method in the pipeline and return its output
     */
    await next()
  }
}
