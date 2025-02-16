import type { HttpContext } from '@adonisjs/core/http'

export function beginRedirect(ctx: HttpContext, url: string) {
    ctx.response.encryptedCookie('redirect', url)
}

export function getRedirect(ctx: HttpContext): string | undefined {
    const redirect = ctx.request.encryptedCookie('redirect')
    ctx.response.clearCookie('redirect')

    return redirect
}