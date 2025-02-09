import User from '#models/user'
import Hashids from 'hashids'
import db from '@adonisjs/lucid/services/db'

export default class ReferralService {
  static hashIds = new Hashids('', 8)

  static encode(id: number): string {
    return ReferralService.hashIds.encode(id)
  }

  static decode(hashId: string): number {
    return ReferralService.hashIds.decode(hashId)[0] as number
  }

  async handlePointAttribution(referredUser: User, referallCode: string) {
    const promoterId = ReferralService.decode(referallCode)
    if (!promoterId) return

    const promoter = await User.find(promoterId)
    if (!promoter) return

    if (promoter.isStudentAssociation()) {
      const trx = await db.transaction()
      promoter.useTransaction(trx)
      referredUser.useTransaction(trx)

      try {
        promoter.points += 20
        await referredUser.related('referredBy').associate(promoter)

        await promoter.save()
        await referredUser.save()

        trx.commit()
      } catch {
        trx.rollback()
      }
    } else if (promoter.isParticipant()) {
      const trx = await db.transaction()
      promoter.useTransaction(trx)
      referredUser.useTransaction(trx)

      try {
        const referralAssociation = await User.find(promoter.referredBy)

        if (referralAssociation !== null) {
          referralAssociation.points += 20
        }
        promoter.points += 10
        referredUser.referredBy = promoter.referredBy

        promoter.save()
        referredUser.save()

        trx.commit()
      } catch {
        trx.rollback()
      }
    }
  }
}
