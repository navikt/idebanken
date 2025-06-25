import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    jsxA11y.flatConfigs.recommended,
    {
        ignores: ['build/**/*.*', '.xp-codegen/**/*.*', 'node_modules/**/*.*'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    }
)
