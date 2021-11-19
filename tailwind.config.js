module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ["Lato"],
    },
    extend: {
      backgroundImage: (theme) => ({
        sheet: "url('/sheet.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
