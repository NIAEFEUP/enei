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
const EventsController = () => import('#controllers/events_controller')

const AuthenticationController = () => import('#controllers/authentication_controller')
const OrdersController = () => import('#controllers/orders_controller')
const TicketsController = () => import('#controllers/tickets_controller')
const ProfilesController = () => import('#controllers/profiles_controller')
const UsersController = () => import('#controllers/users_controller')

const StoreController = () => import('#controllers/store_controller')
const ReferralsController = () => import('#controllers/referrals_controller')

router.on('/').renderInertia('home').as('pages:home')

router
  .group(() => {
    router
      .group(() => {
        router.on('/login').renderInertia('auth/login').as('pages:auth.login')
        router.post('/login', [AuthenticationController, 'login']).as('actions:auth.login')

        router.on('/register').renderInertia('auth/register').as('pages:auth.register')
        router.post('/register', [AuthenticationController, 'register']).as('actions:auth.register')
      })
      .use(middleware.guest())

    router
      .group(() => {
        router.post('/logout', [AuthenticationController, 'logout']).as('actions:auth.logout')

        router
          .group(() => {
            router.on('/verify').renderInertia('auth/verify').as('pages:auth.verify')
            router
              .post('/verify/new', [AuthenticationController, 'retryEmailVerification'])
              .as('actions:auth.verify.send')
              .use(emailVerificationThrottle)
          })
          .use(middleware.noVerifiedEmail())
      })
      .use(middleware.auth())

    router
      .on('/password/forgot')
      .renderInertia('auth/forgot-password')
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
      .on('/verify/success')
      .renderInertia('auth/verify/success')
      .as('pages:auth.verify.success')

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

router
  .group(() => {
    router.get('/', [ProfilesController, 'show']).as('pages:signup')
    router.post('/', [ProfilesController, 'create']).as('actions:signup')
  })
  .prefix('/signup')
  .use([middleware.auth(), middleware.noProfile()])

router
  .group(() => {
    router.get('/', [TicketsController, 'index']).as('pages:tickets')
    router
      .get('/:id/checkout', [TicketsController, 'showPayment'])
      .as('checkout')
      .use([middleware.auth(), middleware.verifiedEmail(), middleware.participant()])
  })
  .prefix('/tickets')

router
  .group(() => {
    //router.get('/', [OrdersController, 'index']) acho que isto já nao e usado
    router.post('/mbway', [OrdersController, 'createMBWay'])
    router.get('/:id', [OrdersController, 'show']).as('payment.show')
  })
  .use([middleware.auth(), middleware.verifiedEmail(), middleware.participant()])
  .prefix('payment')

router
  .group(() => {
    router.get('/u/:slug', [ProfilesController, 'index']).as('pages:profile.show')
    router
      .get('/profile', [ProfilesController, 'default'])
      .as('pages:profile.default')
      .use([middleware.auth(), middleware.verifiedEmail()])
    router
      .get('/profile/edit', [ProfilesController, 'edit'])
      .as('pages:profile.edit')
      .use([middleware.auth(), middleware.verifiedEmail()])
  })
  .use(middleware.wip())

router
  .group(() => {
    router.get('/', [EventsController, 'index']).as('pages:events')
    router.get('/:id', [EventsController, 'show']).as('pages:events.show')
    router
      .post('/:id/register', [EventsController, 'register'])
      .as('actions:events.register')
      .use([middleware.auth(), middleware.verifiedEmail(), middleware.participant()])
    router.get('/:id/tickets', [EventsController, 'ticketsRemaining']).as('actions:events.tickets')
    router
      .get('/:id/is-registered', [EventsController, 'isRegistered'])
      .as('actions:events.isRegistered')
    router
      .get('/:id/is-registered-by-email', [EventsController, 'isRegisteredByEmail'])
      .as('actions:events.isRegisteredByEmail')
      .use(middleware.companyBearerAuth())
  })
  .prefix('events')

router.on('/faq').renderInertia('faq').as('pages:faq').use(middleware.wip())

router
  .group(() => {
    router.on('/').renderInertia('cv').as('pages:cv')
  })
  .use([middleware.auth(), middleware.verifiedEmail()])
  .prefix('cv') // dummy route for testing
  .use(middleware.wip())


router.
  group(() => {
    router.get('/cv', [UsersController, 'showCV'])
    router.post('/cv/upload', [UsersController, 'storeCV'])
    router.delete('cv/delete', [UsersController, 'deleteCV'])
    router.get('/cv/name', [UsersController, 'showCVName'])
    router.get('/:id/cv/download', [UsersController, 'downloadCV']).use( middleware.company())

    // Avatar endpoints
    router.get('/avatar', [UsersController, 'showAvatar'])
    router.get('/avatar/name', [UsersController, 'showAvatarName'])
    router.post('/avatar/upload', [UsersController, 'storeAvatar'])
    router.delete('/avatar/delete', [UsersController, 'deleteAvatar'])

  })
  .use(middleware.auth())
  .prefix('user')

router
  .group(() => {
    router.get('/', [StoreController, 'index']).as('pages:store')
    router.post('/products/:id/buy/', [StoreController, 'buy']).as('actions:store.buy')
  })
  .use([middleware.auth(), middleware.verifiedEmail(), middleware.participant(), middleware.wip()])
  .prefix('/store')

// Referrals
router
  .get('/referrals', [ReferralsController, 'showReferralLink'])
  .middleware(middleware.auth())
  .as('pages:referrals')

router
  .route(`/r/:referralCode`, ['GET', 'POST'], [ReferralsController, 'link'])
  .middleware([middleware.automaticSubmit(), middleware.silentAuth()])
  .as('actions:referrals.link')
