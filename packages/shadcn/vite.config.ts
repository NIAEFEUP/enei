import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), dts({ include: ['lib/**/*']}), tailwindcss()],
  build: {
    cssCodeSplit: true,
    copyPublicDir: false,

    lib: {
      formats: ['es'],
      entry: {
        styles: resolve(__dirname, 'src/css/styles.css'),
        "ui/accordion": resolve(__dirname, 'lib/components/ui/accordion'),
        "ui/alert-dialog": resolve(__dirname, 'lib/components/ui/alert-dialog'),
        "ui/alert": resolve(__dirname, 'lib/components/ui/alert'),
        "ui/aspect-ratio": resolve(__dirname, 'lib/components/ui/aspect-ratio'),
        "ui/avatar": resolve(__dirname, 'lib/components/ui/avatar'),
        "ui/badge": resolve(__dirname, 'lib/components/ui/badge'),
        "ui/breadcrumb": resolve(__dirname, 'lib/components/ui/breadcrumb'),
        "ui/button": resolve(__dirname, 'lib/components/ui/button'),
        "ui/calendar": resolve(__dirname, 'lib/components/ui/calendar'),
        "ui/card": resolve(__dirname, 'lib/components/ui/card'),
        "ui/carousel": resolve(__dirname, 'lib/components/ui/carousel'),
        "ui/chart": resolve(__dirname, 'lib/components/ui/chart'),
        "ui/checkbox": resolve(__dirname, 'lib/components/ui/checkbox'),
        "ui/collapsible": resolve(__dirname, 'lib/components/ui/collapsible'), 
        "ui/command": resolve(__dirname, 'lib/components/ui/command'), 
        "ui/context-menu": resolve(__dirname, 'lib/components/ui/context-menu'), 
        "ui/dialog": resolve(__dirname, 'lib/components/ui/dialog'), 
        "ui/drawer": resolve(__dirname, 'lib/components/ui/drawer'), 
        "ui/dropdown-menu": resolve(__dirname, 'lib/components/ui/dropdown-menu'), 
        "ui/form": resolve(__dirname, 'lib/components/ui/form'), 
        "ui/hover-card": resolve(__dirname, 'lib/components/ui/hover-card'), 
        "ui/input-otp": resolve(__dirname, 'lib/components/ui/input-otp'), 
        "ui/input": resolve(__dirname, 'lib/components/ui/input'), 
        "ui/label": resolve(__dirname, 'lib/components/ui/label'), 
        "ui/menubar": resolve(__dirname, 'lib/components/ui/menubar'), 
        "ui/navigation-menu": resolve(__dirname, 'lib/components/ui/navigation-menu'), 
        "ui/pagination": resolve(__dirname, 'lib/components/ui/pagination'), 
        "ui/popover": resolve(__dirname, 'lib/components/ui/popover'), 
        "ui/progress": resolve(__dirname, 'lib/components/ui/progress'), 
        "ui/radio-group": resolve(__dirname, 'lib/components/ui/radio-group'), 
        "ui/resizable": resolve(__dirname, 'lib/components/ui/resizable'), 
        "ui/scroll-area": resolve(__dirname, 'lib/components/ui/scroll-area'), 
        "ui/select": resolve(__dirname, 'lib/components/ui/select'), 
        "ui/separator": resolve(__dirname, 'lib/components/ui/separator'), 
        "ui/sheet": resolve(__dirname, 'lib/components/ui/sheet'), 
        "ui/sidebar": resolve(__dirname, 'lib/components/ui/sidebar'), 
        "ui/skeleton": resolve(__dirname, 'lib/components/ui/skeleton'), 
        "ui/slider": resolve(__dirname, 'lib/components/ui/slider'), 
        "ui/sonner": resolve(__dirname, 'lib/components/ui/sonner'), 
        "ui/switch": resolve(__dirname, 'lib/components/ui/switch'), 
        "ui/table": resolve(__dirname, 'lib/components/ui/table'), 
        "ui/tabs": resolve(__dirname, 'lib/components/ui/tabs'), 
        "ui/textarea": resolve(__dirname, 'lib/components/ui/textarea'), 
        "ui/toggle-group": resolve(__dirname, 'lib/components/ui/toggle-group'), 
        "ui/toggle": resolve(__dirname, 'lib/components/ui/toggle'), 
        "ui/tooltip": resolve(__dirname, 'lib/components/ui/tooltip'),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
