import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "oklch(var(--color-gold) / <alpha-value>)",
          dark: "oklch(var(--color-gold-dark) / <alpha-value>)",
          light: "oklch(var(--color-gold-light) / <alpha-value>)",
        },
        ivory: "oklch(var(--color-ivory) / <alpha-value>)",
        charcoal: "oklch(var(--color-charcoal) / <alpha-value>)",
        border: "oklch(var(--color-border) / <alpha-value>)",
        background: "oklch(var(--color-background) / <alpha-value>)",
        foreground: "oklch(var(--color-foreground) / <alpha-value>)",
        "muted-foreground": "oklch(var(--color-muted-foreground) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
