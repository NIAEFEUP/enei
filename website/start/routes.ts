/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const GithubAccountsController = () => import('#controllers/github_accounts_controller')
const GoogleAccountsController = () => import('#controllers/google_accounts_controller')
const AccountsController = () => import('#controllers/accounts_controller')
import router from '@adonisjs/core/services/router'

const TicketsController = () => import('#controllers/tickets_controller')

router.on('/').renderInertia('home')
router.get('/tickets', [TicketsController, 'index'])
router.on('/tickets/:id/checkout').renderInertia('payments').as('checkout')

router.on('/login').renderInertia('login')
router.post('/login', [AccountsController, 'login'])

router
  .group(() => {
    router.get('/redirect', [GithubAccountsController, 'init'])
    router.get('/callback', [GithubAccountsController, 'callback'])
  })
  .prefix('/github')

router
  .group(() => {
    router.get('/redirect', [GoogleAccountsController, 'init'])
    router.get('/callback', [GoogleAccountsController, 'callback'])
  })
  .prefix('/google')
