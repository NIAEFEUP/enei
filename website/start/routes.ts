/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import KeycloakController from '../app/controllers/keycloak_controller.ts'

router.on('/').renderInertia('home')

router.group(() => {
    router.get('/', 'KeycloakController.initFlow')
    router.get('/callback', 'KeycloakController.callback')
}).prefix('/keycloak')
