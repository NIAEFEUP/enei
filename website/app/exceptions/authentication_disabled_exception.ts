import { Exception } from '@adonisjs/core/exceptions'

export default class AuthenticationDisabledException extends Exception {
  static status = 403
  static code = "E_AUTH_DISABLED"
  static message = "Authentication is disabled"
  static help = "Did you forget to enable authentication in your .env file?"
}
