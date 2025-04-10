import { defineConfig } from "vite";
import { getDirname } from "@adonisjs/core/helpers";
import inertia from "@adonisjs/inertia/client";
import react from "@vitejs/plugin-react";
import adonisjs from "@adonisjs/vite/client";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.tsx" } }),
    react(),
    adonisjs({ entrypoints: ["inertia/app/app.tsx"], reload: ["resources/views/**/*.edge"] }),
  ],
  esbuild: {
    target: 'esnext'
  },
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(import.meta.url)}/inertia/`,
    },
  },
});
