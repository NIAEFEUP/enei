import User from '#models/user';
import * as client from 'openid-client'
import { HttpContext } from '@adonisjs/core/http'

/**
 * This controller is reponsible for handling the OpenID Connect flow with a configured KeyCloak instance.
 */
export default class OIDCController {
  private static config: client.Configuration;
  private static code_verifier: string;
  private static nonce: string;

  async createConfig() {
    return await client.discovery(
      new URL(process.env.OIDC_DISCOVERY_ENDPOINT),
      process.env.OIDC_CLIENT_ID,
      process.env.OIDC_CLIENT_SECRET,
      undefined,
      {
        execute: [client.allowInsecureRequests],
      }
    );
  }

  /**
   *  Starts the OpenID Connect flow by redirecting to the KeyCloak login page according to the OIDC protocol.
   */
  public async initFlow({ response }: HttpContext) {
    OIDCController.config = await this.createConfig();
    console.log("CONFIG2: ", OIDCController.config);

    let code_challenge_method = 'S256'
    OIDCController.code_verifier = client.randomPKCECodeVerifier()
    let code_challenge = await client.calculatePKCECodeChallenge(OIDCController.code_verifier)

    let redirect_uri = "http://localhost:3333/keycloak/callback"
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
    if (!OIDCController.config.serverMetadata().supportsPKCE()) {
      OIDCController.nonce = client.randomNonce();
      parameters.nonce = OIDCController.nonce;
    }

    let redirectTo = client.buildAuthorizationUrl(OIDCController.config, parameters)

    // redirect to redirectTo.href in adonisjs controller
    return response.redirect().toPath(redirectTo.href);
  }

  /**
   * Called by the Keycloak server after it validates the user credentials and where our application will
   * handle the response and if sucessful either login or create the user
   */
  public async callback({ request, response, auth }: HttpContext) {
    let sub: string;
    let access_token: string;

    let tokens = await client.authorizationCodeGrant(OIDCController.config, new URL(request.completeUrl(true)), {
      pkceCodeVerifier: OIDCController.code_verifier,
      expectedNonce: OIDCController.nonce,
      idTokenExpected: true,
    });

      ; ({ access_token } = tokens)
    let claims = tokens.claims()!
      ; ({ sub } = claims)

    let userInfo = await client.fetchUserInfo(OIDCController.config, access_token, sub)

    //console.log('UserInfo Response', userInfo);

    let user = await User.firstOrCreate({ email: userInfo.email });

    await auth.use('web').login(user);

    return response.redirect().toPath('/');
  }
}
