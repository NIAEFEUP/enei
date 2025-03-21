import { AsyncLocalStorage } from 'node:async_hooks'
import $logger from '@adonisjs/core/services/logger'
import { Logger } from '@adonisjs/core/logger'

export const loggerStorage = new AsyncLocalStorage<Logger>()

export function logger() {
  return loggerStorage.getStore() || $logger
}
