import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme.js";

export default {
  // darkMode: ['class'],
  content: [
    "./resources/**/*.edge",
    "./inertia/**/*.{js,ts,jsx,tsx}",
    "./app/admin/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "enei-blue": "hsl(var(--enei-blue))",
        "enei-beige": "hsl(var(--enei-beige))",
        "enei-emerald": "hsl(var(--enei-emerald))",
        "primary": {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "enei-meal": "hsl(var(--enei-meal))",
        "enei-workshop": "hsl(var(--enei-workshop))",
        "enei-talk": "hsl(var(--enei-talk))",
        "enei-other": "hsl(var(--enei-blue))",
        "enei-night": "hsl(var(--enei-night))",
        "enei-competition": "hsl(var(--enei-competition))",
        "enei-networking": "hsl(var(--enei-networking))",

        "cambridge-blue": "#9EBD9F",
        "dark-cyan": "#5A8C86",
        "sunray": "#E2AD50",
        "persian-orange": "#E28C40",
        "dark-persian-orange": "#914E13",
        "sand": {
          "1": "#fdfdfc",
          "2": "#f9f9f8",
          "3": "#f1f0ef",
          "4": "#e9e8e6",
          "5": "#e2e1de",
          "6": "#dad9d6",
          "7": "#cfceca",
          "8": "#bcbbb5",
          "9": "#8d8d86",
          "10": "#82827c",
          "11": "#63635e",
          "12": "#21201c",
        },
        "background": "hsl(var(--background))",
        "foreground": "hsl(var(--foreground))",
        "card": {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "popover": {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        "secondary": {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "muted": {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        "accent": {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "destructive": {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        "border": "hsl(var(--border))",
        "input": "hsl(var(--input))",
        "ring": "hsl(var(--ring))",
        "chart": {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "sidebar": {
          "DEFAULT": "hsl(var(--sidebar-background))",
          "foreground": "hsl(var(--sidebar-foreground))",
          "primary": "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          "accent": "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          "border": "hsl(var(--sidebar-border))",
          "ring": "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        "3xl": "1800px",
      },
      gridTemplateRows: {
        "13": "repeat(12, minmax(1rem, 1fr))",
        "14": "repeat(14, minmax(1rem, 1fr))",
        "15": "repeat(15, minmax(1rem, 1fr))",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
