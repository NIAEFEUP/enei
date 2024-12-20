import * as client from 'openid-client'

/**
 * This controller is reponsible for handling the OpenID Connect flow with a configured KeyCloak instance.
 */
export default class KeycloakController {
  /**
   *  Starts the OpenID Connect flow by redirecting to the KeyCloak login page according to the OIDC protocol.
   */
  public initFlow() {

  }

  /**
   * Called by the Keycloak server after it validates the user credentials and where our application will
   * handle the response and if sucessful either login or create the user
   */
  public callback() {}
}
