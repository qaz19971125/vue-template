module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recess-order',
    'stylelint-config-html'
  ],
  overrides: [
    {
      files: ['*.sass', '*.scss', '**/*.sass', '**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'function-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null
  },
  defaultSeverity: 'warning'
}
