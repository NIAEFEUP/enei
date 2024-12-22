import User from '#models/user';
import * as client from 'openid-client'
import { HttpContext } from '@adonisjs/core/http'

async function createConfig() {
  return await client.discovery(
    new URL(process.env.OIDC_DISCOVERY_ENDPOINT),
    process.env.OIDC_CLIENT_ID,
    process.env.OIDC_CLIENT_SECRET,
    undefined,
    {
      execute: process.env.NODE_ENV === "development" ? [client.allowInsecureRequests] : []
    }
  );
}

const config = createConfig();

/**
 * This controller is reponsible for handling the OpenID Connect flow with a configured KeyCloak instance.
 */
export default class OIDCController {
  /**
   *  Starts the OpenID Connect flow by redirecting to the KeyCloak login page according to the OIDC protocol.
   */
  public async initFlow({ response }: HttpContext) {
    let resolvedConfig = await config
    let code_challenge_method = 'S256'
    let code_verifier = client.randomPKCECodeVerifier()
    let code_challenge = await client.calculatePKCECodeChallenge(code_verifier)

    let redirect_uri = `${process.env.OIDC_REDIRECT_URI}`;
    let parameters: Record<string, string> = {
      redirect_uri,
      scope: 'openid email',
      code_challenge,
      code_challenge_method,
    }

    /**
     * We cannot be sure the AS supports PKCE so we're going to use nonce too. Use
     * of PKCE is backwards compatible even if the AS doesn't support it which is
     * why we're using it regardless.
     */
    if (!resolvedConfig.serverMetadata().supportsPKCE()) {
      throw new Error("PKCE not supported");
    }

    let redirectTo = client.buildAuthorizationUrl(resolvedConfig, parameters)

    // redirect to redirectTo.href in adonisjs controller
    return response.cookie('pkce_code_verifier', code_verifier).redirect().toPath(redirectTo.href);
  }

  /**
   * Called by the Keycloak server after it validates the user credentials and where our application will
   * handle the response and if sucessful either login or create the user
   */
  public async callback({ request, response, auth }: HttpContext) {
    const resolvedConfig = await config;
    const code_verifier = request.cookie('pkce_code_verifier');

    let sub: string;
    let access_token: string;

    let tokens = await client.authorizationCodeGrant(resolvedConfig, new URL(request.completeUrl(true)), {
      pkceCodeVerifier: code_verifier,
      idTokenExpected: true,
    });

      ; ({ access_token } = tokens)
    let claims = tokens.claims()!
      ; ({ sub } = claims)

    let userInfo = await client.fetchUserInfo(resolvedConfig, access_token, sub)
    
    let user = await User.firstOrCreate(
    { 
      username: userInfo.preferred_username,
    });

    await auth.use('web').login(user);

    return response
      .cookie('access_token', tokens.access_token, { expires: new Date((new Date()).getTime() + (tokens.expires_in)) })
      .cookie('refresh_token', tokens.refresh_token, { expires: new Date((new Date()).getTime() + (tokens.expires_in)) })
      .redirect()
      .toPath('/');
  }
}
