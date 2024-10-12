/** @type {import("prettier").Config} */
export default {
  arrowParens: 'avoid',
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-organize-imports',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
