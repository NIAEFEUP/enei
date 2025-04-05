import { defineConfig } from "vite";
import { getDirname } from "@adonisjs/core/helpers";
import inertia from "@adonisjs/inertia/client";
import react from "@vitejs/plugin-react";
import adonisjs from "@adonisjs/vite/client";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { VitePWA } from "vite-plugin-pwa";

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
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifest: {
        name: "ENEI",
        short_name: "ENEI",
        description: "Encontro Nacional de Estudantes de Informática",
        theme_color: "#0B4F6C",
        icons: [
          {
            src: "/images/icons/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/icons/512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

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
