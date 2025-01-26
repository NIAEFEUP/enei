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
import { emailVerificationThrottle } from '#start/limiter'
const AuthenticationController = () => import('#controllers/authentication_controller')
const OrdersController = () => import('#controllers/orders_controller')
const TicketsController = () => import('#controllers/tickets_controller')

router.on('/').renderInertia('home').as('pages:home')

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



router.get('/tickets', [TicketsController, 'index'])
router.get('/tickets/:id/checkout', [TicketsController, 'showPayment']).as('checkout').middleware(middleware.auth())

router
  .group(() => {
    //router.get('/', [OrdersController, 'index']) acho que isto já nao e usado
    router.post('/mbway', [OrdersController, 'createMBWay']).use(middleware.auth())
    router.get('/:id', [OrdersController, 'show']).as('payment.show')
  })
  .middleware(middleware.requireAuthenticationEnabled())
  .prefix('payment')
