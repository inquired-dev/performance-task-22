module.exports = {
    root: false,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    ignorePatterns: ["**/*.d.ts", '**/*.js'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'array-bracket-spacing': [ 'warn', 'always', { 'objectsInArrays': false, 'arraysInArrays': false }],
        'object-curly-spacing': [ 'error', 'always', { 'objectsInObjects': false }],
        'semi': [ 'error', 'always' ],
        'indent': [ 'error', 4, { 'SwitchCase': 1 }],
        'no-empty-function': 'off',
        'max-len': [ 'error', { 'code': 125, 'ignoreStrings': true, 'ignoreTemplateLiterals': true }],
        '@typescript-eslint/no-empty-function': 0,
        'quotes': [ 'warn', 'single' ],
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [ 'error' ],
        'no-trailing-spaces': 'error'
    },
};
