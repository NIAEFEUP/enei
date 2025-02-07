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
const TicketsController = () => import('#controllers/tickets_controller')
const ProfilesController = () => import('#controllers/profiles_controller')

router.on('/').renderInertia('home').as('pages:home').use(middleware.finishRedirect())

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

        router.on('/verify').renderInertia('auth/verify').as('pages:auth.verify')
        router
          .post('/verify/new', [AuthenticationController, 'retryEmailVerification'])
          .as('actions:auth.verify.send')
          .use(emailVerificationThrottle)
      })
      .use(middleware.auth())

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
    router.get('/', [TicketsController, 'index']).as('pages:tickets.show')
    router.on('/:id/checkout').renderInertia('payments').as('pages:tickets.checkout')
  })
  .prefix('/tickets')
  .use([middleware.auth(), middleware.participant(), middleware.verifiedEmail()])
