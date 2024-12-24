import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter, createBrowserHistory } from '@tanstack/react-router'
import { ThemeProvider } from "@/components/theme/theme-provider"
import { siteConfig } from "@/config/site"

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create browser history
const browserHistory = createBrowserHistory()

// Create a new router instance
const router = createRouter({ 
    routeTree,
    basepath: siteConfig.basePath,
    history: browserHistory,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  )
}