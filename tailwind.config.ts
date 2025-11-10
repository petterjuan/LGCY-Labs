import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./sections/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#3b82f6",
        accent: "#f59e0b",
        neutral: "#f8fafc"
      },
      backgroundImage: {
        "global-gradient": "linear-gradient(180deg, rgba(30,64,175,0.08) 0%, rgba(59,130,246,0.03) 40%, rgba(248,250,252,1) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
