import env from '#start/env'
import { defineConfig } from '@benhepburn/adonis-sentry'

/**
 * Configuration options to use Sentry in your AdonisJS application.
 */
const sentryConfig = defineConfig({
  dsn: env.get('SENTRY_DSN'),
  tracesSampleRate: env.get('SENTRY_TRACES_SAMPLE_RATE', 1.0),
})

export default sentryConfig