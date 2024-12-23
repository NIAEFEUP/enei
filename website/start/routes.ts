/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import OrdersController from '#controllers/orders_controller'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

router.group(() => {
  router.post('/mbway', [OrdersController, 'createMBWay'])
  router.get('/:id', [OrdersController, 'show'])
}).prefix('payment')
