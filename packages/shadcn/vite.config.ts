import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import publish from "@enei/vite-config/publish";

export default defineConfig({
  plugins: [react(), tailwindcss(), publish({ tsconfigPath: "./tsconfig.app.json" })],

  build: { cssCodeSplit: true, copyPublicDir: false },

  resolve: { alias: { "@": resolve(__dirname, "./src") } },
});
