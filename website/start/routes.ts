/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

const TicketsController = () => import('#controllers/tickets_controller')

router.use([() => import('#middleware/referral_middleware')])

router.on('/').renderInertia('home')
router.get('/tickets', [TicketsController, 'index'])
router.on('/tickets/:id/checkout').renderInertia('payments').as('checkout')
