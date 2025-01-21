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

router.on('/').renderInertia('home').as('pages:home')
router.get('/tickets', [TicketsController, 'index'])
router.on('/tickets/:id/checkout').renderInertia('payments').as('checkout')

router
  .group(() => {
    router
      .on('/login')
      .renderInertia('auth/login')
      .as('pages:auth.login')
      .use(middleware.redirectIfAuthenticated())

    router
      .post('/login', [AuthenticationController, 'login'])
      .as('actions:auth.login')
      .use(middleware.redirectIfAuthenticated())

    router
      .on('/register')
      .renderInertia('auth/register')
      .as('pages:auth.register')
      .use(middleware.redirectIfAuthenticated())

    router
      .post('/register', [AuthenticationController, 'register'])
      .as('actions:auth.register')
      .use(middleware.redirectIfAuthenticated())

    router
      .get('/email-confirmation', [AuthenticationController, 'showEmailConfirmation'])
      .as('pages:auth.email-confirmation')
      .use(middleware.auth())

    router
      .route('/verify', ['GET', 'POST'], [AuthenticationController, 'verify'])
      .as('actions:auth.verify')
      .middleware(middleware.automaticSubmit())

    // Github
    router
      .get('/github/initiate', [AuthenticationController, 'initiateGithubLogin'])
      .as('actions:auth.github.initiate')

    router
      .get('/github/callback', [AuthenticationController, 'callbackForGithubLogin'])
      .middleware(middleware.verifySocialCallback({ provider: 'github' }))
      .as('actions:auth.github.callback')

    // Google
    router
      .get('/google/initiate', [AuthenticationController, 'initiateGoogleLogin'])
      .as('actions:auth.google.initiate')

    router
      .get('/google/callback', [AuthenticationController, 'callbackForGoogleLogin'])
      .middleware(middleware.verifySocialCallback({ provider: 'google' }))
      .as('actions:auth.google.callback')

    // LinkedIn
    router
      .get('/linkedin/initiate', [AuthenticationController, 'initiateLinkedinLogin'])
      .as('actions:auth.linkedin.initiate')

    router
      .get('/linkedin/callback', [AuthenticationController, 'callbackForLinkedinLogin'])
      .middleware(middleware.verifySocialCallback({ provider: 'linkedin' }))
      .as('actions:auth.linkedin.callback')
  })
  .prefix('/auth')
