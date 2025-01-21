import UserCreated from '#events/user_created'
import emitter from '@adonisjs/core/services/emitter'

const SendVerificationEmail = () => import("#listeners/send_verification_email")

emitter.on(UserCreated, [SendVerificationEmail, 'handle'])
