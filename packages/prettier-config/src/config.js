/** @type {import('prettier').Config} */
module.exports = {
  plugins: [
    require.resolve("prettier-plugin-edgejs"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],

  overrides: [
    {
      files: ["*.json"],
      options: {
        objectWrap: "preserve",
      },
    },
    {
      files: ["*.md"],
      options: {
        proseWrap: "never",
      },
    },
  ],

  arrowParens: "always",
  experimentalOperatorPosition: "start",
  printWidth: 100,
  quoteProps: "consistent",

  // Tailwind CSS
  tailwindPreserveWhitespace: false,
  tailwindPreserveDuplicates: false,
};
