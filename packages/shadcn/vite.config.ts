import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json' }),
    tailwindcss(),
  ],
  build: {
    cssCodeSplit: true,
    copyPublicDir: false,

    lib: {
      formats: ['es'],
      entry: {
        styles: resolve(__dirname, 'src/css/styles.css'),
        "lib/components/ui/accordion": resolve(__dirname, 'lib/components/ui/accordion'),
        "lib/components/ui/alert-dialog": resolve(__dirname, 'lib/components/ui/alert-dialog'),
        "lib/components/ui/alert": resolve(__dirname, 'lib/components/ui/alert'),
        "lib/components/ui/aspect-ratio": resolve(__dirname, 'lib/components/ui/aspect-ratio'),
        "lib/components/ui/avatar": resolve(__dirname, 'lib/components/ui/avatar'),
        "lib/components/ui/badge": resolve(__dirname, 'lib/components/ui/badge'),
        "lib/components/ui/breadcrumb": resolve(__dirname, 'lib/components/ui/breadcrumb'),
        "lib/components/ui/button": resolve(__dirname, 'lib/components/ui/button'),
        "lib/components/ui/calendar": resolve(__dirname, 'lib/components/ui/calendar'),
        "lib/components/ui/card": resolve(__dirname, 'lib/components/ui/card'),
        "lib/components/ui/carousel": resolve(__dirname, 'lib/components/ui/carousel'),
        "lib/components/ui/chart": resolve(__dirname, 'lib/components/ui/chart'),
        "lib/components/ui/checkbox": resolve(__dirname, 'lib/components/ui/checkbox'),
        "lib/components/ui/collapsible": resolve(__dirname, 'lib/components/ui/collapsible'), 
        "lib/components/ui/command": resolve(__dirname, 'lib/components/ui/command'), 
        "lib/components/ui/context-menu": resolve(__dirname, 'lib/components/ui/context-menu'), 
        "lib/components/ui/dialog": resolve(__dirname, 'lib/components/ui/dialog'), 
        "lib/components/ui/drawer": resolve(__dirname, 'lib/components/ui/drawer'), 
        "lib/components/ui/dropdown-menu": resolve(__dirname, 'lib/components/ui/dropdown-menu'), 
        "lib/components/ui/form": resolve(__dirname, 'lib/components/ui/form'), 
        "lib/components/ui/hover-card": resolve(__dirname, 'lib/components/ui/hover-card'), 
        "lib/components/ui/input-otp": resolve(__dirname, 'lib/components/ui/input-otp'), 
        "lib/components/ui/input": resolve(__dirname, 'lib/components/ui/input'), 
        "lib/components/ui/label": resolve(__dirname, 'lib/components/ui/label'), 
        "lib/components/ui/menubar": resolve(__dirname, 'lib/components/ui/menubar'), 
        "lib/components/ui/navigation-menu": resolve(__dirname, 'lib/components/ui/navigation-menu'), 
        "lib/components/ui/pagination": resolve(__dirname, 'lib/components/ui/pagination'), 
        "lib/components/ui/popover": resolve(__dirname, 'lib/components/ui/popover'), 
        "lib/components/ui/progress": resolve(__dirname, 'lib/components/ui/progress'), 
        "lib/components/ui/radio-group": resolve(__dirname, 'lib/components/ui/radio-group'), 
        "lib/components/ui/resizable": resolve(__dirname, 'lib/components/ui/resizable'), 
        "lib/components/ui/scroll-area": resolve(__dirname, 'lib/components/ui/scroll-area'), 
        "lib/components/ui/select": resolve(__dirname, 'lib/components/ui/select'), 
        "lib/components/ui/separator": resolve(__dirname, 'lib/components/ui/separator'), 
        "lib/components/ui/sheet": resolve(__dirname, 'lib/components/ui/sheet'), 
        "lib/components/ui/sidebar": resolve(__dirname, 'lib/components/ui/sidebar'), 
        "lib/components/ui/skeleton": resolve(__dirname, 'lib/components/ui/skeleton'), 
        "lib/components/ui/slider": resolve(__dirname, 'lib/components/ui/slider'), 
        "lib/components/ui/sonner": resolve(__dirname, 'lib/components/ui/sonner'), 
        "lib/components/ui/switch": resolve(__dirname, 'lib/components/ui/switch'), 
        "lib/components/ui/table": resolve(__dirname, 'lib/components/ui/table'), 
        "lib/components/ui/tabs": resolve(__dirname, 'lib/components/ui/tabs'), 
        "lib/components/ui/textarea": resolve(__dirname, 'lib/components/ui/textarea'), 
        "lib/components/ui/toggle-group": resolve(__dirname, 'lib/components/ui/toggle-group'), 
        "lib/components/ui/toggle": resolve(__dirname, 'lib/components/ui/toggle'), 
        "lib/components/ui/tooltip": resolve(__dirname, 'lib/components/ui/tooltip'),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
