/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

export const emailVerificationThrottle = limiter.define('auth.verify', (ctx) => {
  if (ctx.auth.user) {
    return limiter.allowRequests(1).every('1 minute').usingKey(`user:${ctx.auth.user.id}`)
  }

  return null
})