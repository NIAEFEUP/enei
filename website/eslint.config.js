import { configApp, RULES_LIST, INCLUDE_LIST, IGNORE_LIST } from '@adonisjs/eslint-config'
export default configApp({
    files: [...INCLUDE_LIST, '**/*.tsx'],
    ignores: [
        ...IGNORE_LIST.filter(ignore => !ignore.startsWith('resources/')),
        "inertia/components/ui/**/*"
    ],
    rules: RULES_LIST
})
