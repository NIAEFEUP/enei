/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const OrdersController = () => import('#controllers/orders_controller')
import router from '@adonisjs/core/services/router'

const PaymentsController = () => import('#controllers/payments_controller')

router.on('/').renderInertia('home')

router
  .group(() => {
    router.post('/process', [PaymentsController, 'process'])
    router.get('/', [PaymentsController, 'index'])
    router.post('/mbway', [OrdersController, 'createMBWay'])
    router.get('/:id', [OrdersController, 'show'])
  })
  .prefix('payment')
