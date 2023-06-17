/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/**/*.{js,jsx}"],
  purge: ['./dist/*.html', "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
