import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  prettyPrintDebugQueries: true,

  connection: env.get('DB_CONNECTION', 'sqlite'),
  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },  
    },
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('POSTGRES_HOST', 'localhost'),
        port: Number.parseInt(env.get('POSTGRES_PORT', '5432')),
        user: env.get('POSTGRES_USER', 'postgres'),
        password: env.get('POSTGRES_PASSWORD'),
        database: env.get('POSTGRES_DB', 'postgres'),
      },
    }
  },
})

export default dbConfig
