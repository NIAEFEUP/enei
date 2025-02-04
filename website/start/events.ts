import UserCreated from '#events/user_created'
import UserEmailVerified from '#events/user_email_verified'
import UserRequestedVerificationEmail from '#events/user_requested_verification_email'
import emitter from '@adonisjs/core/services/emitter'

const SendVerificationEmail = () => import('#listeners/send_verification_email')

emitter.on(UserCreated, [SendVerificationEmail, 'handle'])
emitter.on(UserRequestedVerificationEmail, [SendVerificationEmail, 'handle'])

emitter.on(UserEmailVerified, (ev) => console.log(ev))
