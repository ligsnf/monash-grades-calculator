import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { siteConfig } from "./src/config/site"

// https://vite.dev/config/
export default defineConfig({
  base: siteConfig.basePath,
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
