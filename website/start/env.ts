/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
*/

import vine from '@vinejs/vine'
import { defineEnv } from '../app/env.js'

vine.convertEmptyStringsToNull = true

const env = await defineEnv(new URL('../', import.meta.url), 'INERTIA_PUBLIC_', ({ object }) => {
  return object({
    NODE_ENV: vine.enum(['development', 'production', 'test'] as const),
    PORT: vine.number(),
    APP_KEY: vine.string(),
    HOST: vine.string(),
    LOG_LEVEL: vine.string(),

    /*
    |----------------------------------------------------------
    | Variables for configuring session package
    |----------------------------------------------------------
    */
    SESSION_DRIVER: vine.enum(['cookie', 'memory'] as const),

    /*
    |----------------------------------------------------------
    | Variables for configuring the mail package
    |----------------------------------------------------------
    */
    FROM_EMAIL: vine.string(),
    SMTP_HOST: vine.string(),
    SMTP_PORT: vine.string(),
    //AWS_ACCESS_KEY_ID: vine.string(),
    //AWS_SECRET_ACCESS_KEY: vine.string(),
    //AWS_REGION: vine.string(),
    //MAILGUN_API_KEY: vine.string(),
    //MAILGUN_DOMAIN: vine.string(),
    //SPARKPOST_API_KEY: vine.string(),
    //RESEND_API_KEY: vine.string(),
    //BREVO_API_KEY: vine.string(),

    /*
    |----------------------------------------------------------
    | Variables for configuring the jobs package
    |----------------------------------------------------------
    */
    REDIS_HOST: vine.string(),
    REDIS_PORT: vine.number(),
    REDIS_PASSWORD: vine.string().optional(),
    REDIS_QUEUE: vine.string().optional(),

    /*
    |----------------------------------------------------------
    | Variables for configuring the homepage countdown
    |----------------------------------------------------------
    */
    INERTIA_PUBLIC_TZ: vine.string(),
    INERTIA_PUBLIC_EVENT_COUNTDOWN_DATE: vine.string(),
    INERTIA_PUBLIC_APP_URL: vine.string(),
  })
})

export default env
