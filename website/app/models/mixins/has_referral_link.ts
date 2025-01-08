import HashIdService from '#services/referral_service'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { BaseModel } from '@adonisjs/lucid/orm'
import router from '@adonisjs/core/services/router'

export const HasReferralLink = <T extends NormalizeConstructor<typeof BaseModel>>(
  superclass: T
) => {
  return class extends superclass {
    public getPromoterCode(): number {
      throw new Error('Method getPromoterCode is not defined.')
    }

    public getReferralCode = (): string => {
      return HashIdService.encode(this.getPromoterCode())
    }

    public getReferralLink = (): string => {
      return router
        .builder()
        .qs({
          ref: this.getReferralCode(),
        })
        .make('home')
    }
  }
}
