/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
*/

import vine from "@vinejs/vine";
import { defineEnv } from "../app/env.js";

vine.convertEmptyStringsToNull = true;

const env = await defineEnv(new URL("../", import.meta.url), "INERTIA_PUBLIC_", ({ object }) => {
  return object({
    NODE_ENV: vine.enum(["development", "production", "test"] as const),
    PORT: vine.number(),
    HOST: vine.string(),
    LOG_LEVEL: vine.string(),

    APP_KEY: vine.string(),

    /*
    |----------------------------------------------------------
    | Variables for configuring the database
    |----------------------------------------------------------
    */

    /*
    |----------------------------------------------------------
    | Variables for configuring session package
    |----------------------------------------------------------
    */
    SESSION_DRIVER: vine.enum(["cookie", "memory"] as const),

    /*
    |----------------------------------------------------------
    | Variables for configuring the payments system
    |----------------------------------------------------------
    */
    IFTHENPAY_MBWAY_KEY: vine.string(),

    /*
    |----------------------------------------------------------
    | Variables for configuring the mail package
    |----------------------------------------------------------
    */
    FROM_EMAIL: vine.string(),
    REPLY_TO_EMAIL: vine.string().optional(),

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
    | Variables for configuring the limiter package
    |----------------------------------------------------------
    */
    LIMITER_STORE: vine.enum(["redis", "memory"] as const),

    /*
    |----------------------------------------------------------
    | Variables for configuring the social authentication
    |----------------------------------------------------------
    */
    GITHUB_CLIENT_ID: vine.string(),
    GITHUB_CLIENT_SECRET: vine.string(),

    GOOGLE_CLIENT_ID: vine.string(),
    GOOGLE_CLIENT_SECRET: vine.string(),

    LINKEDIN_CLIENT_ID: vine.string(),
    LINKEDIN_CLIENT_SECRET: vine.string(),

    /*
    |----------------------------------------------------------
    | Variables for configuring app features
    |   even though variables are public, they are meant to be
    |   used by the backend as well
    |----------------------------------------------------------
    */
    FEATURES_DISABLE_AUTH: vine
      .boolean({ strict: false })
      .optional()
      .transform((val) => val ?? false),

    /*
    |----------------------------------------------------------
    | Variables for configuring the homepage countdown
    |----------------------------------------------------------
    */
    INERTIA_PUBLIC_TZ: vine.string(),
    INERTIA_PUBLIC_EVENT_COUNTDOWN_DATE: vine.string(),

    /*
    |----------------------------------------------------------
    | Variables for configuring tuyau
    |----------------------------------------------------------
    */
    INERTIA_PUBLIC_APP_URL: vine.string(),

    /*
    |----------------------------------------------------------
    | Variables for configuring the drive package
    |----------------------------------------------------------
    */
    DRIVE_DISK: vine.enum(["fs"]),

    /*
    |----------------------------------------------------------
    | Variables with api keys for calling protected routes
    |----------------------------------------------------------
    */
    JOBS_API_KEY: vine.string(),
    
    /*
    |----------------------------------------------------------
    | Variables for configuring the API endpoints for Kevel
    |----------------------------------------------------------
    */
    COMPANY_BEARER_TOKEN: vine.string(),

    /*
    |----------------------------------------------------------
    | Variables for configuring the proxy-level trust,
    | used for determining the base URL of the application.
    |----------------------------------------------------------
    */
    TRUST_PROXY: vine.union([
      vine.union.if(
        (_, field) => field.isDefined,
        vine.unionOfTypes([vine.boolean(), vine.string().ipAddress(4)]),
      ),
      vine.union.else(vine.literal(undefined).optional()),
    ]),
  });
});

export default env;
