module.exports = {
  root: true,

  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module'
  },

  env: {
    browser: true,
    node: true,
    es6: true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:sonarjs/recommended',
    'prettier'
  ],

  plugins: ['import'],

  rules: {
    'vue/require-default-prop': 0,
    'vue/attributes-order': [
      1,
      {
        alphabetical: true
      }
    ],
    'vue/no-v-html': 0,
    'vue/component-options-name-casing': 1,
    'vue/custom-event-name-casing': 1,
    'vue/no-multiple-objects-in-class': 2,
    'vue/no-this-in-before-route-enter': 2,
    'vue/padding-line-between-blocks': 1,
    'vue/prefer-separate-static-class': 2,
    'vue/static-class-names-order': 1,
    'vue/v-on-function-call': 2,
    'vue/multi-word-component-names': 1,
    'vue/no-unused-components': 1,
    'vue/no-unused-vars': 1,

    'import/newline-after-import': 1,

    'sonarjs/cognitive-complexity': [2, 80],
    'sonarjs/max-switch-cases': [2, 30],
    'sonarjs/no-duplicate-string': 0,
    'sonarjs/no-duplicated-branches': 1,
    'sonarjs/no-extra-arguments': 0,
    'sonarjs/no-ignored-return': 1,
    'sonarjs/no-nested-switch': 0,
    'sonarjs/no-unused-collection': 1,
    'sonarjs/no-empty-collection': 1,
    'sonarjs/no-identical-functions': 1,
    'sonarjs/no-small-switch': 0,
    'sonarjs/prefer-immediate-return': 0,
    'sonarjs/prefer-object-literal': 0,
    'sonarjs/prefer-single-boolean-return': 1,

    'no-use-before-define': [2, { functions: false, classes: true, variables: true }],
    'no-template-curly-in-string': 2,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true
      }
    ],
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-var': 1,
    'no-case-declarations': 0,
    'no-prototype-builtins': 0,
    'no-async-promise-executor': 0,
    'array-callback-return': 2,
    'no-void': 0,
    'no-useless-escape': 0,
    'prefer-promise-reject-errors': 0,
    'dot-notation': 0,
    'prefer-const': [
      1,
      {
        destructuring: 'all'
      }
    ],
    'lines-between-class-members': 1,
    'multiline-ternary': 0,

    'max-lines-per-function': [
      2,
      {
        max: 220,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'max-nested-callbacks': [1, 3],
    'max-depth': [1, 5],
    'max-params': [1, 7],
    'require-atomic-updates': 0
  }
}
