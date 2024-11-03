/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    plugins: [require('prettier-plugin-tailwindcss')],
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: true,
};

export default config;