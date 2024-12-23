/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const PaymentsController = () => import('#controllers/payments_controller')

router.on('/').renderInertia('home')

router.get('/payment', [PaymentsController, 'index'])
router.post('/payment/process', [PaymentsController, 'process'])
