import Hashids from 'hashids'

export default class HashIdService {
  static hashIds = new Hashids('', 8)

  static encode(id: number) {
    return HashIdService.hashIds.encode(id)
  }

  static decode(hashId: string) {
    return HashIdService.hashIds.decode(hashId)[0]
  }
}
