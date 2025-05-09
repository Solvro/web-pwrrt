import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{html,js}",
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
        customRed: "rgb(203, 31, 58)",
        customRedTransparent: "rgba(203, 31, 58, 0.2)",
      },
      fontSize: {
        "6xl": "6rem",
      },
      keyframes: {
        rotateX: {
          "0%": { transform: "rotateX(0)" },
          "50%": { transform: "rotateX(90deg)", opacity: "0" },
          "100%": { transform: "rotateX(180deg)", opacity: "1" },
        },
      },
      animation: {
        "rotate-y-180": "rotateX 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

// eslint-disable-next-line import/no-default-export
export default config;
