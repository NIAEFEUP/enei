import User from '#models/user'
import * as client from 'openid-client'
import { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

async function createConfig() {
  return await client.discovery(
    new URL(env.get('OIDC_DISCOVERY_ENDPOINT')),
    env.get('OIDC_CLIENT_ID'),
    env.get('OIDC_CLIENT_SECRET'),
    undefined,
    {
      execute: process.env.NODE_ENV === 'development' ? [client.allowInsecureRequests] : [],
    }
  )
}

const config = createConfig()

/**
 * This controller is reponsible for handling the OpenID Connect flow with a configured KeyCloak instance.
 */
export default class OIDCController {
  /**
   *  Starts the OpenID Connect flow by redirecting to the KeyCloak login page according to the OIDC protocol.
   */
  public async initFlow({ response }: HttpContext) {
    let resolvedConfig = await config
    let codeChallengeMethod = 'S256'
    let codeVerifier = client.randomPKCECodeVerifier()
    let codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier)

    let redirectUri = `${process.env.OIDC_REDIRECT_URI}`
    let parameters: Record<string, string> = {
      redirect_uri: redirectUri,
      scope: 'openid email',
      code_challenge: codeChallenge,
      code_challenge_method: codeChallengeMethod,
    }

    /**
     * We cannot be sure the AS supports PKCE so we're going to use nonce too. Use
     * of PKCE is backwards compatible even if the AS doesn't support it which is
     * why we're using it regardless.
     */
    if (!resolvedConfig.serverMetadata().supportsPKCE()) {
      throw new Error('PKCE not supported')
    }

    let redirectTo = client.buildAuthorizationUrl(resolvedConfig, parameters)

    // redirect to redirectTo.href in adonisjs controller
    return response.cookie('pkce_code_verifier', codeVerifier).redirect().toPath(redirectTo.href)
  }

  /**
   * Called by the Keycloak server after it validates the user credentials and where our application will
   * handle the response and if sucessful either login or create the user
   */
  public async callback({ request, response, auth }: HttpContext) {
    const resolvedConfig = await config
    const codeVerifier = request.cookie('pkce_code_verifier')

    let sub: string
    let accessToken: string

    let tokens = await client.authorizationCodeGrant(
      resolvedConfig,
      new URL(request.completeUrl(true)),
      {
        pkceCodeVerifier: codeVerifier,
        idTokenExpected: true,
      }
    )

    ;({ access_token: accessToken } = tokens)
    let claims = tokens.claims()!
    ;({ sub } = claims)

    let userInfo = await client.fetchUserInfo(resolvedConfig, accessToken, sub)

    let user = await User.firstOrCreate({
      username: userInfo.preferred_username,
    })

    await auth.use('web').login(user)

    if (!tokens.expires_in || !tokens.refresh_expires_in) {
      return response.abort('Expiration parameter not found in tokens given by oidc provider', 500)
    }

    return response
      .cookie('access_token', tokens.access_token, {
        expires: new Date(new Date().getTime() + tokens.expires_in),
      })
      .cookie('refresh_token', tokens.refresh_token, {
        expires: new Date(new Date().getTime() + Number(tokens.refresh_expires_in)),
      })
      .redirect()
      .toPath('/')
  }
}
