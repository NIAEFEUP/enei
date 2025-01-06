/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthenticationController = () => import('#controllers/authentication_controller')
const TicketsController = () => import('#controllers/tickets_controller')

router.on('/').renderInertia('home')
router.on('/login').renderInertia('login')
router.get('/tickets', [TicketsController, 'index'])
router.on('/tickets/:id/checkout').renderInertia('payments').as('checkout')

router
  .group(() => {
    // Github
    router
      .get('/github/initiate', [AuthenticationController, 'initiateGithubLogin'])
      .as('auth.github.initiate')

    router
      .get('/github/callback', [AuthenticationController, 'callbackForGithubLogin'])
      .middleware(middleware.verifySocialCallback({ provider: 'github' }))
      .as('auth.github.callback')

    // Google
    router
      .get('/google/initiate', [AuthenticationController, 'initiateGoogleLogin'])
      .as('auth.google.initiate')

    router
      .get('/google/callback', [AuthenticationController, 'callbackForGoogleLogin'])
      .middleware(middleware.verifySocialCallback({ provider: 'google' }))
      .as('auth.google.callback')

    // LinkedIn
    router
      .get('/linkedin/initiate', [AuthenticationController, 'initiateLinkedinLogin'])
      .as('auth.linkedin.initiate')

    router
      .get('/linkedin/callback', [AuthenticationController, 'callbackForLinkedinLogin'])
      .middleware(middleware.verifySocialCallback({ provider: 'linkedin' }))
      .as('auth.linkedin.callback')
  })
  .prefix('/auth')
