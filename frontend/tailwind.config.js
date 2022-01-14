module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFA200",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};