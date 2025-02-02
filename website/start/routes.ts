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
import { emailVerificationThrottle, sendForgotPasswordThrottle } from '#start/limiter'

const AuthenticationController = () => import('#controllers/authentication_controller')
const TicketsController = () => import('#controllers/tickets_controller')

router.on('/').renderInertia('home').as('pages:home')
router.get('/tickets', [TicketsController, 'index'])
router.on('/tickets/:id/checkout').renderInertia('payments').as('checkout')

router
  .group(() => {
    router.on('/login').renderInertia('auth/login').as('pages:auth.login').use(middleware.guest())

    router
      .post('/login', [AuthenticationController, 'login'])
      .as('actions:auth.login')
      .use(middleware.guest())

    router
      .post('/logout', [AuthenticationController, 'logout'])
      .as('actions:auth.logout')
      .use(middleware.auth())

    router
      .on('/register')
      .renderInertia('auth/register')
      .as('pages:auth.register')
      .use(middleware.guest())

    router
      .post('/register', [AuthenticationController, 'register'])
      .as('actions:auth.register')
      .use(middleware.guest())

    router
      .on('/password/forgot')
      .renderInertia('auth/forgot-password/index')
      .as('pages:auth.forgot-password')
      .use(middleware.guest())

    router
      .on('/password/forgot/sent')
      .renderInertia('auth/forgot-password/sent')
      .as('page:auth.forgot-password.sent')
      .use(middleware.guest())

    router
      .post('/password/forgot/new', [AuthenticationController, 'sendForgotPassword'])
      .as('actions:auth.forgot-password.send')
      .use([middleware.guest(), sendForgotPasswordThrottle])

    router
      .get('/password/forgot/callback', [AuthenticationController, 'showForgotPasswordPage'])
      .as('pages:auth.forgot-password.callback')
      .middleware(middleware.verifyUrlSignature())

    router
      .post('/password/forgot/callback', [AuthenticationController, 'callbackForForgotPassword'])
      .as('actions:auth.forgot-password.callback')
      .middleware(middleware.verifyUrlSignature())

    router
      .on('/password/forgot/success')
      .renderInertia('auth/forgot-password/success')
      .as('actions:auth.forgot-password.success')

    router
      .on('/verify')
      .renderInertia('auth/verify/index')
      .as('pages:auth.verify')
      .use(middleware.auth())

    router
      .post('/verify/new', [AuthenticationController, 'retryEmailVerification'])
      .as('actions:auth.verify.send')
      .use([middleware.auth(), emailVerificationThrottle])

    router
      .on('/verify/success')
      .renderInertia('auth/verify/success')
      .as('actions:auth.verify.success')

    router
      .route(
        '/verify/callback',
        ['GET', 'POST'],
        [AuthenticationController, 'callbackForEmailVerification']
      )
      .as('actions:auth.verify.callback')
      .middleware([middleware.verifyUrlSignature(), middleware.automaticSubmit()])

    // SOCIAL AUTHENTICATION

    // router
    //   .get('/github/initiate', [AuthenticationController, 'initiateGithubLogin'])
    //   .as('actions:auth.github.initiate')

    // router
    //   .get('/github/callback', [AuthenticationController, 'callbackForGithubLogin'])
    //   .middleware(middleware.verifySocialCallback({ provider: 'github' }))
    //   .as('actions:auth.github.callback')

    // // Google
    // router
    //   .get('/google/initiate', [AuthenticationController, 'initiateGoogleLogin'])
    //   .as('actions:auth.google.initiate')

    // router
    //   .get('/google/callback', [AuthenticationController, 'callbackForGoogleLogin'])
    //   .middleware(middleware.verifySocialCallback({ provider: 'google' }))
    //   .as('actions:auth.google.callback')

    // // LinkedIn
    // router
    //   .get('/linkedin/initiate', [AuthenticationController, 'initiateLinkedinLogin'])
    //   .as('actions:auth.linkedin.initiate')

    // router
    //   .get('/linkedin/callback', [AuthenticationController, 'callbackForLinkedinLogin'])
    //   .middleware(middleware.verifySocialCallback({ provider: 'linkedin' }))
    //   .as('actions:auth.linkedin.callback')
  })
  .middleware(middleware.requireAuthenticationEnabled())
  .prefix('/auth')
