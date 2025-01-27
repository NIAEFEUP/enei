import type { HttpContext } from '@adonisjs/core/http'
import type { Database } from '@adonisjs/lucid/database'
import db from '@adonisjs/lucid/services/db'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

type TransactionParameters = Parameters<Database['transaction']>

export function transact(...trxArgs: TransactionParameters) {
  return function <Args extends [HttpContext, ...any[]], Ret>(
    _target: any,
    _key: string,
    descriptor: TypedPropertyDescriptor<(...args: Args) => Promise<Ret>>
  ) {
    const originalMethod = descriptor.value!

    descriptor.value = function (this, ...args: Args) {
      return db.transaction((trx) => {
        const ctx = args[0]

        ctx.trx = trx
        return originalMethod.call(this, ...args)
      }, ...trxArgs)
    }

    return descriptor
  }
}

declare module '@adonisjs/core/http' {
  interface HttpContext {
    trx: TransactionClientContract
  }
}
