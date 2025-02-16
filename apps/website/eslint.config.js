import { configApp, RULES_LIST } from '@adonisjs/eslint-config'

// Downgrade all lints to warnings
import 'eslint-plugin-only-warn'

export default configApp(
  {
    name: 'Custom config for Inertia',
    files: ['inertia/**/*.ts', 'inertia/**/*.tsx'],
    ignores: ['inertia/components/ui/**/*'],
    rules: RULES_LIST,
  },
  {
    ignores: ['.adonisjs/**/*'],
    rules: {
      'prettier/prettier': 'off',
    },
  }
)
