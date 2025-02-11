import { Exception } from '@adonisjs/core/exceptions'

export default class ReferralsDisabledException extends Exception {
  static status = 500
  static code = 'E_REFERRAL_DISABLED'
  static message = 'Referrals not open yet'
  static help = 'The referrals feature is currently disabled'
}