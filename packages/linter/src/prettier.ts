module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  endOfLine: 'lf',
  printWidth: 100,
  proseWrap: 'never',
  bracketSpacing: true,
  arrowParens: 'always',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
};
