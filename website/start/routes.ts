/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TicketsController = () => import('#controllers/tickets_controller')
import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
router.get('/tickets', [TicketsController, 'index'])
router.on('/tickets/:id/checkout').renderInertia('payments').as('checkout')
