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

const ProfilesController = () => import('#controllers/profiles_controller')

router.on('/').renderInertia('home')
router.on('/signup').renderInertia('signup')
router.post('/signup', [ProfilesController, 'create']).use(middleware.profile())
