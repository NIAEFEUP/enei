import Hashids from 'hashids'

export default class HashIdService {
  static hashIds = new Hashids('', 8)

  static encode(id: number): string {
    return HashIdService.hashIds.encode(id)
  }

  static decode(hashId: string): number {
    return HashIdService.hashIds.decode(hashId)[0] as number
  }
}
