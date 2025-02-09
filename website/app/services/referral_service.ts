import User from '#models/user'
import Hashids from 'hashids'
import db from '@adonisjs/lucid/services/db'

export default class ReferralService {
  static POINTS_FOR_ASSOCIATION = 20
  static POINTS_FOR_PARTICIPANT = 10

  static hashIds = new Hashids('', 8)

  static encode(id: number): string {
    return ReferralService.hashIds.encode(id)
  }

  static decode(hashId: string): number {
    return ReferralService.hashIds.decode(hashId)[0] as number
  }

  static async handlePointAttribution(referredUser: User, referralCode: string) {
    const promoterId = ReferralService.decode(referralCode)
    if (!promoterId) return

    const promoter = await User.find(promoterId)
    if (!promoter) return

    if (promoter.isStudentAssociation()) {
      await db.transaction(async (trx) => {
        promoter.useTransaction(trx)
        referredUser.useTransaction(trx)

        promoter.points += this.POINTS_FOR_ASSOCIATION
        // FIXME: Not associating
        await referredUser.related('referredBy').associate(promoter)
      })
    } else if (promoter.isParticipant()) {
      console.log("promoter is participant")
      const referralAssociation = await User.find(promoter.referredById)

      // If the promoter was referred by a student association
      // give points to the student association and to the
      // promoter, else, give only to the promoter
      await db.transaction(async (trx) => {
        promoter.useTransaction(trx)
        referredUser.useTransaction(trx)
        referralAssociation?.useTransaction(trx)

        if (referralAssociation !== null) {
          referralAssociation.points += this.POINTS_FOR_ASSOCIATION
          await referredUser.related('referredBy').associate(referralAssociation)
        }
        promoter.points += this.POINTS_FOR_PARTICIPANT
      })
    }
  }
}
