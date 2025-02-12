import User from '#models/user'
import Hashids from 'hashids'
import db from '@adonisjs/lucid/services/db'

export default class ReferralService {
  static POINTS_FOR_PROMOTER = 20
  static POINTS_FOR_PARTICIPANT = 10

  static hashIds = new Hashids('', 8)

  static encode(id: number): string {
    return ReferralService.hashIds.encode(id)
  }

  static decode(hashId: string): number {
    return ReferralService.hashIds.decode(hashId)[0] as number
  }

  static async handlePointAttribution(referredUser: User, referralCode: string) {
    // referredUser cannot be a promoter
    if (referredUser.isPromoter())
      return

    // cannot use a referral more than once
    if (referredUser.hasBeenReferred())
      return

    const referralUserId = ReferralService.decode(referralCode)
    if (!referralUserId) return

    const referralUser = await User.find(referralUserId)
    if (!referralUser) return

    if (referralUser.isPromoter()) {

      // If the referralUser is a promoter
      // give points to the referralUser
      await db.transaction(async (trx) => {
        referralUser.useTransaction(trx)
        referredUser.useTransaction(trx)

        referralUser.points += this.POINTS_FOR_PROMOTER

        await referredUser.related('referredByPromoter').associate(referralUser)
        await referredUser.related('referredByUser').associate(referralUser)
        referralUser.save()
      })
    } else if (referralUser.isParticipant()) {
      const referralPromoter: User | null = referralUser.referredByPromoterId !== null
        ? await User.find(referralUser.referredByPromoterId)
        : null;

      // If the referralUser is a participant and was
      // previously referred by a promoter, give points
      // to the referralUser and to the promoter, else
      // give only to the referralUser
      await db.transaction(async (trx) => {
        referralUser.useTransaction(trx)
        referredUser.useTransaction(trx)
        referralPromoter?.useTransaction(trx)

        referralUser.points += this.POINTS_FOR_PARTICIPANT
        if (referralPromoter !== null && referralPromoter.isPromoter()) {
          await referredUser.related('referredByPromoter').associate(referralPromoter)
          referralPromoter.points += this.POINTS_FOR_PROMOTER
          referralPromoter.save()
        }
        await referralUser.save()

        await referredUser.related('referredByUser').associate(referralUser)
        await referredUser.save()
      })
    }
  }
}
