/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

const OrdersController = () => import('#controllers/orders_controller')
const TicketsController = () => import('#controllers/tickets_controller')

import User from '#models/user'
import { middleware } from '#start/kernel'

router.on('/').renderInertia('home')
router.get('/tickets', [TicketsController, 'index'])
router.get('/tickets/:id/checkout', [TicketsController, 'showPayment']).as('checkout')

router
  .group(() => {
    router.get('/', [OrdersController, 'index'])
    router.post('/mbway', [OrdersController, 'createMBWay']).use(middleware.auth())
    router.get('/:id', [OrdersController, 'show']).as('payment.show')
  })
  .prefix('payment')

router.get('login/:id', async ({ params, auth, response }) => {
  const userId = params.id

  const user = await User.find(userId)
  if (!user) {
    return response.status(404).send('User not found')
  }

  await auth.use('web').login(user)
  response.send('User logged in')
})

router.get('logout', async ({ auth, response }) => {
  // Dummy logout to test
  // Check if a user is logged in
  if (await auth.use('web').check()) {
    // Log out the user
    await auth.use('web').logout()
    response.send('User logged out')
  } else {
    response.status(401).send('No user is logged in')
  }
})
