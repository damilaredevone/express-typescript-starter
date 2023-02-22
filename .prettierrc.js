module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  printWidth: 83,
  overrides: [
    {
      files: ['*.yml'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.json'],
      options: {
        singleQuote: false,
        quoteProps: 'preserve',
      },
    },
  ],
}
