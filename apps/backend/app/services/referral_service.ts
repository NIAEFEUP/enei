import User from '#models/user'
import Sqids from 'sqids'
import { buildUrl } from '../url.js'

// const POINTS_FOR_PROMOTER = 20
// const POINTS_FOR_PARTICIPANT = 10

const sqids = new Sqids({
  minLength: 8,
})

export default class ReferralService {
  // Low-level encoding/decoding

  #encode(id: number) {
    return sqids.encode([id])
  }

  #decode(hashId: string): number | null {
    const values = sqids.decode(hashId)

    if (values.length !== 1) return null
    return values[0] ?? null
  }

  // To be moved to a policy once bouncer is installed

  async canUserRefer(user: User) {
    if (user.isPromoter()) return true

    return await User.hasPurchasedTicket(user)
  }

  async canUserBeLinked(user: User) {
    return !user.isPromoter() && !user.wasReferred() && !(await User.hasPurchasedTicket(user))
  }

  // High-level methods

  async #getReferralCode(user: User) {
    if (!(await this.canUserRefer(user))) {
      return null
    }

    return this.#encode(user.id)
  }

  async getReferralLink(user: User) {
    const referralCode = await this.#getReferralCode(user)
    if (!referralCode) {
      return null
    }

    return buildUrl().params({ referralCode: referralCode }).make('actions:referrals.link')
  }

  async getReferrerByCode(referralCode: string): Promise<User | null> {
    const referralUserId = this.#decode(referralCode)
    if (!referralUserId) return null

    const referrer = await User.find(referralUserId)
    if (!referrer || !(await this.canUserRefer(referrer))) return null

    return referrer
  }

  async getReferralCount(user: User): Promise<number | null> {
    if (!(await this.canUserRefer(user))) return null

    const referrals = await user
      .related('referrals')
      .query()
      .count('*', 'count')
      .first()
    return referrals?.$extras.count
  }

  async getIndirectReferralCount(user: User): Promise<number | null> {
    if (!user.isPromoter() || !(await this.canUserRefer(user))) return null

    const indirectReferrals = await user
      .related('indirectReferrals')
      .query()
      .count('*', 'count')
      .first()
    return indirectReferrals?.$extras.count
  }

  async linkUserToReferrer(referredUser: User, referrer: User) {
    if (!(await this.canUserBeLinked(referredUser))) {
      return
    }

    await referredUser.related('referrer').associate(referrer)

    const referringPromoter = referrer.isPromoter()
      ? referrer
      : referrer.referringPromoterId !== null
        ? await User.getReferringPromoter(referrer)
        : null

    if (referringPromoter) {
      await referredUser.related('referringPromoter').associate(referringPromoter)
    }
  }

  // To be moved to the points system, not implemented at the referral system level
  // async handlePointAttribution(referredUser: User, referralCode: string) {
  //   // referredUser must be a participant
  //   if (!referredUser.isParticipant())
  //     return

  //   const referralUserId = ReferralService.decode(referralCode)
  //   if (!referralUserId) return

  //   const referralUser = await User.find(referralUserId)
  //   if (!referralUser) return

  //   if (referralUser.isPromoter()) {

  //     // If the referralUser is a promoter
  //     // give points to the referralUser
  //     await db.transaction(async (trx) => {
  //       referralUser.useTransaction(trx)
  //       referredUser.useTransaction(trx)

  //       referralUser.points += POINTS_FOR_PROMOTER

  //       await referredUser.related('rootReferrer').associate(referralUser)
  //       await referredUser.related('referrer').associate(referralUser)
  //       referralUser.save()
  //     })
  //   } else if (referralUser.isParticipant()) {
  //     const referralPromoter: User | null = referralUser.rootReferrerId !== null
  //       ? await User.find(referralUser.rootReferrerId)
  //       : null;

  //     // If the referralUser is a participant and was
  //     // previously referred by a promoter, give points
  //     // to the referralUser and to the promoter, else
  //     // give only to the referralUser
  //     await db.transaction(async (trx) => {
  //       referralUser.useTransaction(trx)
  //       referredUser.useTransaction(trx)
  //       referralPromoter?.useTransaction(trx)

  //       referralUser.points += POINTS_FOR_PARTICIPANT
  //       if (referralPromoter !== null && referralPromoter.isPromoter()) {
  //         await referredUser.related('referredByPromoter').associate(referralPromoter)
  //         referralPromoter.points += POINTS_FOR_PROMOTER - POINTS_FOR_PARTICIPANT
  //         referralPromoter.save()
  //       }
  //       await referralUser.save()

  //       await referredUser.related('referredByUser').associate(referralUser)
  //       await referredUser.save()
  //     })
  //   }
  // }
}
