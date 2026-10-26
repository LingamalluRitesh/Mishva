/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          navy: "#0B2545",
          dark: "#081b33",
          deep: "#0F2E59",
          blue: "#1E40AF",
          accent: "#2563EB",
          lightBlue: "#E0F2FE",
          red: "#E63946",
          crimson: "#D90429",
          redHover: "#C1121F",
          lightRed: "#FEE2E2",
          gold: "#F59E0B",
          emerald: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
