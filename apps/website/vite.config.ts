import { defineConfig } from "vite";
import { getDirname } from "@adonisjs/core/helpers";
import inertia from "@adonisjs/inertia/client";
import react from "@vitejs/plugin-react-swc";
import adonisjs from "@adonisjs/vite/client";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.tsx" } }),
    adonisjs({ entrypoints: ["inertia/app/app.tsx"], reload: ["resources/views/**/*.edge"] }),
  ],
  esbuild: {
    target: "esnext",
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
