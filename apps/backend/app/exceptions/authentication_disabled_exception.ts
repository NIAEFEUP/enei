import { Exception } from '@adonisjs/core/exceptions'

export default class AuthenticationDisabledException extends Exception {
  static override status = 403
  static override code = 'E_AUTH_DISABLED'
  static override message = 'Authentication is disabled'
  static override help = 'Did you forget to enable authentication in your .env file?'
}
