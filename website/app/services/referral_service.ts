import User from '#models/user'
import Hashids from 'hashids'

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
    if(!promoterId) return;

    const promoter = await User.find(promoterId)
    if(!promoter) return;

    if(promoter.isStudentAssociation()) {
    } else if(promoter.isParticipant()) {

    }

    referredUser.referredBy = promoter
  }
}
