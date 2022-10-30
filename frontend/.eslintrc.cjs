// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'browser': true,
        'es2021' : true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType' : 'module',
    },
    'plugins': [
        'vue',
    ],
    'rules': {
        'indent': [
            'error',
            4,
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'never',
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'comma-spacing': [
            'error',
            { 'before': false, 'after': true },
        ],
        'key-spacing': [
            'error',
            { 'align': 'colon' },
        ],
        'no-trailing-spaces': 'error',
        'space-infix-ops'   : 'error',
    },
}
