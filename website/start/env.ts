/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  TZ: Env.schema.string(),
  LOG_LEVEL: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

  // App-related variables
  APP_KEY: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring session package
  |----------------------------------------------------------
  */
  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory'] as const),

  /*
 |----------------------------------------------------------
 | Variables for configuring the mail package
 |----------------------------------------------------------
 */
  FROM_EMAIL: Env.schema.string(),
  SMTP_HOST: Env.schema.string(),
  SMTP_PORT: Env.schema.string(),
  //AWS_ACCESS_KEY_ID: Env.schema.string(),
  //AWS_SECRET_ACCESS_KEY: Env.schema.string(),
  //AWS_REGION: Env.schema.string(),
  //MAILGUN_API_KEY: Env.schema.string(),
  //MAILGUN_DOMAIN: Env.schema.string(),
  //SPARKPOST_API_KEY: Env.schema.string(),
  //RESEND_API_KEY: Env.schema.string(),
  //BREVO_API_KEY: Env.schema.string()

  /*
  |----------------------------------------------------------
  | Variables for configuring ally package
  |----------------------------------------------------------
  */
  GITHUB_CLIENT_ID: Env.schema.string(),
  GITHUB_CLIENT_SECRET: Env.schema.string(),
  GOOGLE_CLIENT_ID: Env.schema.string(),
  GOOGLE_CLIENT_SECRET: Env.schema.string(),
  LINKEDIN_CLIENT_ID: Env.schema.string(),
  LINKEDIN_CLIENT_SECRET: Env.schema.string(),

  /*
 |----------------------------------------------------------
 | Variables for configuring the frontend
 |----------------------------------------------------------
 */
  VITE_TZ: Env.schema.string(),
  VITE_EVENT_COUNTDOWN_DATE: Env.schema.string(),
  VITE_APP_URL: Env.schema.string({ format: 'url' }),
})
