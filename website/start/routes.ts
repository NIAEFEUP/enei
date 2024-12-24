/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const OIDCController = () => import('#controllers/oidc_controller')

router.on('/').renderInertia('home')

router
  .group(() => {
    router.get('/', [OIDCController, 'initFlow'])
    router.get('/callback', [OIDCController, 'callback'])
  })
  .prefix('/keycloak')
