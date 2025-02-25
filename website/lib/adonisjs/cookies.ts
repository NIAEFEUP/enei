import { HttpContext } from '@adonisjs/core/http'
import type { CookieOptions } from '@adonisjs/core/types/http'

type TypedCookieOptions = { kind: 'signed' } | { kind: 'encrypted' }

const defaultOptions: TypedCookieOptions = { kind: 'signed' }

class RawSignedCookie {
    constructor(public name: string) {}

    get(ctx: HttpContext, defaultValue?: string) {
        return ctx.request.cookie(this.name, defaultValue)
    }

    set(ctx: HttpContext, value: any, options?: Partial<CookieOptions>) {
        ctx.response.cookie(this.name, value, options)
    }
}

class RawEncryptedCookie {
    constructor(public name: string) {}

    get(ctx: HttpContext, defaultValue?: string) {
        return ctx.request.encryptedCookie(this.name, defaultValue)
    }

    set(ctx: HttpContext, value: any, options?: Partial<CookieOptions>) {
        ctx.response.encryptedCookie(this.name, value, options)
    }
}

export class TypedCookie<T> {
  #cookie: RawSignedCookie | RawEncryptedCookie

  constructor(
    public name: string,
    options?: Partial<TypedCookieOptions>
  ) {
    const resolvedOptions = { ...defaultOptions, ...options }
    
    switch (resolvedOptions.kind) {
      case 'signed':
        this.#cookie = new RawSignedCookie(name)
        break
      case 'encrypted':
        this.#cookie = new RawEncryptedCookie(name)
        break
      default:
        throw new Error('Invalid cookie kind')
    }
  }

  get(ctx: HttpContext, defaultValue?: T) {
    // The cast below is needed because @adonijs/core/http
    // incorrectly enforces the type of the cookie value to be a string
    //
    // https://github.com/adonisjs/http-server/blob/d23061c14fda34ca082e731f16b161a8e1f4a2b3/src/request.ts#L894

    const value = this.#cookie.get(ctx, defaultValue as unknown as string)
    return value as T | null
  }

  set(ctx: HttpContext, value: T, options?: Partial<CookieOptions>) {
    this.#cookie.set(ctx, value, options)
  }

  clear(ctx: HttpContext) {
    ctx.response.clearCookie(this.name)
  }
}
