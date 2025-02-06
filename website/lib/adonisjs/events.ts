import { BaseEvent as $BaseEvent } from '@adonisjs/core/events'
import logger from '@adonisjs/core/services/logger'

export class BaseEvent extends $BaseEvent {
  static async tryDispatch<T extends typeof BaseEvent>(this: T, ...args: ConstructorParameters<T>) {
    try {
      await this.dispatch(...args)
      return [true, undefined] as const
    } catch (error) {
      logger.error(error)
      return [false, error] as const
    }
  }
}
